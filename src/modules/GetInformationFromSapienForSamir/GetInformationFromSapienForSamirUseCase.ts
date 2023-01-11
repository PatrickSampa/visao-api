const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
import { DOMParser } from 'xmldom';
import { parse } from "date-fns";
import { getUsuarioUseCase } from '../GetUsuario';
import { loginUseCase } from '../LoginUsuario';
import { getTarefaUseCase } from '../GetTarefa';
import { IGetInformationsFromSapiensDTO } from '../../DTO/GetInformationsFromSapiensDTO';
import { IGetArvoreDocumentoDTO } from '../../DTO/GetArvoreDocumentoDTO';
import { getArvoreDocumentoUseCase } from '../GetArvoreDocumento/index';
import { IInformationsForCalculeDTO } from '../../DTO/InformationsForCalcule';
import { getDocumentoUseCase } from '../GetDocumento';
import { updateEtiquetaUseCase } from '../UpdateEtiqueta';


export class GetInformationFromSapienForSamirUseCase {

    async execute(data: IGetInformationsFromSapiensDTO): Promise<any> {
        const cookie = await loginUseCase.execute(data.login);
        const usuario = (await getUsuarioUseCase.execute(cookie));

        const usuario_id = `${usuario[0].id}`;

        let response: Array<IInformationsForCalculeDTO> = [];
        try {
            const tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta });

            for (var i = 0; i <= tarefas.length - 1; i++) {
                console.log("tarefas.length", (tarefas.length - 1 - i));
                const tarefaId = tarefas[i].id;
                const objectGetArvoreDocumento: IGetArvoreDocumentoDTO = { nup: tarefas[i].pasta.NUP, chave: tarefas[i].pasta.chaveAcesso, cookie, tarefa_id: tarefas[i].id }
                const arrayDeDocumentos = (await getArvoreDocumentoUseCase.execute(objectGetArvoreDocumento)).reverse();

                const objectDosPrev = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
                const objectDosPrevNaoExisti = objectDosPrev == null;
                if (objectDosPrevNaoExisti) {
                    console.log(await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ECONTRADO", tarefaId }))
                    continue;
                }
                //console.log(objectDosPrev);
                const dosPrevSemIdParaPesquisa = (objectDosPrev.documentoJuntado.componentesDigitais.length) <= 0;
                if (dosPrevSemIdParaPesquisa) {
                    console.log(await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }))
                    continue;
                }
                const idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                const parginaDosPrev = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });

                const parginaDosPrevFormatada = new dom().parseFromString(parginaDosPrev);
                

                const xpathInformacaoDeCabeçalho = "/html/body/div/p[2]/b[1]"
                const informacaoDeCabeçalho = this.getXPathText(parginaDosPrevFormatada, xpathInformacaoDeCabeçalho);
                console.log("informacao", informacaoDeCabeçalho)
                if (!informacaoDeCabeçalho) {
                    console.log(await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV INVALIDO", tarefaId }))
                    continue
                }
                // ative quando for para produçao
                if (this.VerificaçaoSeDosPrevInvalido(informacaoDeCabeçalho)) {
                    console.log(await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV INVALIDO", tarefaId }))
                    continue
                }






                const xpathNumeroDoProcesso = "/html/body/div/div/table/tr/td"
                const numeroDoProcesso: string = this.getXPathText(parginaDosPrevFormatada, xpathNumeroDoProcesso);

                const xpathdataAjuizamento = "/html/body/div/div[1]/tr[2]/td[1]"
                const dataAjuizamento: string = this.getXPathText(parginaDosPrevFormatada, xpathdataAjuizamento);

                const xpathNome = "/html/body/div/div[1]/table/tr[6]/td[1]"
                const nome: string = this.getXPathText(parginaDosPrevFormatada, xpathNome);

                const xpathCpf = "/html/body/div/div[1]/table/tr[7]/td"
                const cpf: string = this.getXPathText(parginaDosPrevFormatada, xpathCpf);

                const urlProcesso = `https://sapiens.agu.gov.br/visualizador?nup=${tarefas[i].pasta.NUP}&chave=${tarefas[i].pasta.chaveAcesso}&tarefaId=${tarefas[i].id}`
                console.log("urlProcesso", urlProcesso, "cpf", cpf, "nome", nome, "dataAjuizamento", dataAjuizamento, "numeroDoProcesso", numeroDoProcesso);
                const citacao = this.coletarCitacao(arrayDeDocumentos)
                console.log("Citacao: " + citacao)
                let informationsForCalculeDTO: IInformationsForCalculeDTO = { beneficio: "teste", dibAnterior: "teste", beneficioAcumuladoBoolean: false, dibInicial: "teste", dip: "teste", id: parseInt(tarefaId), nb: "teste", rmi: "teste", tipo: "teste", numeroDoProcesso, dataAjuizamento, nome, cpf, urlProcesso, citacao }
                response.push(informationsForCalculeDTO);
                // Ativar quando entrar em produção
                // await updateEtiquetaUseCase.execute({ cookie, etiqueta: "LIDO BOOT", tarefaId })


                // if (i == tarefas.length - 1) {
                //     return response
                // }
                // tidNumber++;
            }
            return await response
        } catch (error) {
            console.log(error);
            console.log(response.length)
            if (response.length > 0) {
                return await response
            }
            else {
                new error;
            }
        }



    }
    coletarCitacao(arrayDeDocumentos: ResponseArvoreDeDocumento[]): string {
        const ObjectCitacao = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.nome == "CITAÇÃO");
        if (ObjectCitacao == null) {
            return null
        }
        const ArrayDataCitacaoParaFormatacao = ObjectCitacao.documentoJuntado.dataHoraProducao.date.split(" ")[0].split("-");
        const dataCitacao: string = `${ArrayDataCitacaoParaFormatacao[2]}/${ArrayDataCitacaoParaFormatacao[1]}/${ArrayDataCitacaoParaFormatacao[0]}`
        return dataCitacao;
    }

    VerificaçaoSeDosPrevInvalido(dosPrev: string): boolean {
        //Exemplo: dosprev = * "Informações extraídas dos sistemas informatizados do INSS em: 10/08/2022 11:58:28"
        //Obtendo somente a data em string
        const dateString = dosPrev.split(": ")[1];

        // Converter a string para um objeto Date
        const dateObject = parse(dateString, "dd/MM/yyyy HH:mm:ss", new Date());

        // Calcular a diferença entre a data fornecida e a data atual em milisegundos
        const difference = Date.now() - dateObject.getTime();

        // Converter a diferença de milisegundos para dias
        const differenceInDays = difference / (1000 * 60 * 60 * 24);

        // Verificar se a diferença é maior que 30 dias
        if (differenceInDays > 30) {
            return true;
        } else {
            return false;
        }
    }
    getXPathText(html: any, xpathExpression: string): string {

        const element = xpath.select1(xpathExpression, html);
        if (element == null) {
            console.log("elemento == null");
        }
        return element ? element.textContent : null;
    }

}