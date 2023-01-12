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
import { IBeneficiosDTO } from '../../DTO/BeneficiosDTO';
import { info } from 'console';


export class GetInformationFromSapienForSamirUseCase {

    async execute(data: IGetInformationsFromSapiensDTO): Promise<any> {
        const cookie = await loginUseCase.execute(data.login);
        const usuario = (await getUsuarioUseCase.execute(cookie));

        const usuario_id = `${usuario[0].id}`;

        let response: Array<IInformationsForCalculeDTO> = [];
        try {
            const tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta });

            for (var i = 0; i <= tarefas.length - 1; i++) {
                console.log("Qantidade faltando triar", (tarefas.length - i));
                const tarefaId = tarefas[i].id;
                const objectGetArvoreDocumento: IGetArvoreDocumentoDTO = { nup: tarefas[i].pasta.NUP, chave: tarefas[i].pasta.chaveAcesso, cookie, tarefa_id: tarefas[i].id }
                let arrayDeDocumentos: ResponseArvoreDeDocumento[];

                try {
                    arrayDeDocumentos = (await getArvoreDocumentoUseCase.execute(objectGetArvoreDocumento)).reverse();
                } catch (error) {
                    console.log(error);
                    console.log(await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA PESQUISA", tarefaId }));
                    continue
                }

                const objectDosPrev = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");

                const objectDosPrevNaoExisti = objectDosPrev == null;
                if (objectDosPrevNaoExisti) {
                    console.log(await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ECONTRADO", tarefaId }))
                    continue;
                }

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


                console.log("nb", this.getXPathText(parginaDosPrevFormatada, "/html/body/div/div[1]/div[3]/table[1]/tr[1]/td[2]"))
                // var beneficios = await this.getInformaçoesIniciasDosBeneficios(parginaDosPrevFormatada)
                // beneficios = await this.getInformaçoesSecudariaDosBeneficios(beneficios, parginaDosPrevFormatada)
                // console.log(beneficios);



                const xpathNumeroDoProcesso = "/html/body/div/div/table/tr/td"
                const numeroDoProcesso: string = this.getXPathText(parginaDosPrevFormatada, xpathNumeroDoProcesso);

                const xpathdataAjuizamento = "/html/body/div/div[1]/table/tr[2]/td"
                const dataAjuizamento: string = this.getXPathText(parginaDosPrevFormatada, xpathdataAjuizamento);

                const xpathNome = "/html/body/div/div[1]/table/tr[6]/td[1]"
                const nome: string = this.getXPathText(parginaDosPrevFormatada, xpathNome);

                const xpathCpf = "/html/body/div/div[1]/table/tr[7]/td"
                const cpf: string = this.getXPathText(parginaDosPrevFormatada, xpathCpf);

                const urlProcesso = `https://sapiens.agu.gov.br/visualizador?nup=${tarefas[i].pasta.NUP}&chave=${tarefas[i].pasta.chaveAcesso}&tarefaId=${tarefas[i].id}`
                // console.log("urlProcesso", urlProcesso, "cpf", cpf, "nome", nome, "dataAjuizamento", dataAjuizamento, "numeroDoProcesso", numeroDoProcesso);
                const citacao = this.coletarCitacao(arrayDeDocumentos)
                // console.log("Citacao: " + citacao)
                let informationsForCalculeDTO: IInformationsForCalculeDTO = { beneficio: "teste", dibAnterior: "teste", beneficioAcumuladoBoolean: false, dibInicial: "teste", dip: "teste", id: parseInt(tarefaId), nb: "teste", rmi: "teste", tipo: "teste", numeroDoProcesso, dataAjuizamento, nome, cpf, urlProcesso, citacao }
                response.push(informationsForCalculeDTO);
                // Ativar quando entrar em produção
                // await updateEtiquetaUseCase.execute({ cookie, etiqueta: "LIDO BOOT", tarefaId })

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
    getXPathText(paginaHTML_FormatadaParaPesquisarXPATH: any, xpathExpression: string): string {

        const elementoPesquisado = xpath.select1(xpathExpression, paginaHTML_FormatadaParaPesquisarXPATH);
        const elementoPesquisadoNaoExiste = elementoPesquisado == null;
        if (elementoPesquisadoNaoExiste) {
            console.log("elemento == null");
        }
        return elementoPesquisado ? elementoPesquisado.textContent : null;
    }

    async getInformaçoesIniciasDosBeneficios(paginaHTML_DOSPREV_Formatada: any): Promise<IBeneficiosDTO[]> {
        const result: IBeneficiosDTO[] = [];
        const valorMaximoparaPecoorerALinha = 20;
        const valorDaLinhaInicial = 2;
        for (let indexDaLinha = valorDaLinhaInicial; indexDaLinha <= valorMaximoparaPecoorerALinha; indexDaLinha++) {
            const xpathDaLinhaParaOElementoTipo = "/html/body/div/div[3]/table/tr[" + indexDaLinha + "]/td[6]";
            const tipo = this.getXPathText(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoTipo);
            const tipoNaoEncontrado = tipo == null;
            if (tipoNaoEncontrado) {
                const lidoTodosOsBeneficios = result.length > 0;
                if (lidoTodosOsBeneficios) {
                    break;
                } else {
                    continue
                }
            }
            const verificaçaoDaInValidadeDoTipo = !(tipo == "ATIVO" || tipo == "CESSADO");
            if (verificaçaoDaInValidadeDoTipo) {
                continue
            }
            const xpathDaLinhaParaOElementoNB = "/html/body/div/div[3]/table/tr[" + indexDaLinha + "]/td[1]"
            const nb = this.getXPathText(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoNB)

            const xpathDaLinhaParaOElementoBeneficio = "/html/body/div/div[3]/table/tr[" + indexDaLinha + "]/td[2]"
            const beneficio = this.getXPathText(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoBeneficio)

            const xpathDaLinhaParaOElementoDIB = "/html/body/div/div[3]/table/tr[" + indexDaLinha + "]/td[4]"
            const dib = this.correçaoDoErroDeFormatoDoSapiens(this.getXPathText(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoDIB));

            const xpathDaLinhaParaOElementoDCB = "/html/body/div/div[3]/table/tr[" + indexDaLinha + "]/td[5]"
            const dcb = this.correçaoDoErroDeFormatoDoSapiens(this.getXPathText(paginaHTML_DOSPREV_Formatada, xpathDaLinhaParaOElementoDCB));
            console.log({ tipo, nb, beneficio, dib, dcb });
            result.push({ tipo, nb, beneficio, dib, dcb });

        }
        return await result;
    }
    correçaoDoErroDeFormatoDoSapiens(texto: string): string {
        return texto
            .replace("                                                                                    ", "")
            .replace("                                           ", "")
            .replace("                                               ", "")
            .replace(" ", "")
            .replace("\n", "");
    }

    async getInformaçoesSecudariaDosBeneficios(beneficios: IBeneficiosDTO[], paginaHTML_DOSPREV_Formatada: any): Promise<IBeneficiosDTO[]> {
        const numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio = 6;
        const numeroInicialParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio = 5;

        const numeroMaxioParaProcurarATabelaDoBeneeficio = 50;
        const numeroInicialParaProcurarATabelaDoBeneeficio = 1;
        for (let idexDoBeneficio = 0; idexDoBeneficio < beneficios.length; idexDoBeneficio++) {
            for (let idexDaDivParaPesquisarAtabela = numeroInicialParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio; idexDaDivParaPesquisarAtabela <= numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio; idexDaDivParaPesquisarAtabela++) {
                for (let indexDaTabela = numeroInicialParaProcurarATabelaDoBeneeficio; indexDaTabela <= numeroMaxioParaProcurarATabelaDoBeneeficio; indexDaTabela++) {
                    const xpathNbDaTabela = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[1]/tr[2]/td[1]"
                    const nb = this.getXPathText(paginaHTML_DOSPREV_Formatada, xpathNbDaTabela);
                    console.log("nb", nb, "idexDaDivParaPesquisarAtabela", idexDaDivParaPesquisarAtabela, "indexDaTabela", indexDaTabela);
                    console.log("xpath", xpathNbDaTabela );
                    const divInvalidaParaPesquisa = ((nb == null) && indexDaTabela > 4);
                    if (divInvalidaParaPesquisa) {
                        break;
                    }
                    const nb_EstaDiferenteDoBeneficio = nb != beneficios[idexDoBeneficio].nb;
                    if (nb_EstaDiferenteDoBeneficio) {
                        console.log(nb);
                        continue
                    }
                    const xphatRMI = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[2]/tr[2]/td[1]"
                    const rmi = this.getXPathText(paginaHTML_DOSPREV_Formatada, xphatRMI)
                    beneficios[idexDoBeneficio].rmi = parseFloat(rmi);
                    const xpathDIP = "/html/body/div/div[" + idexDaDivParaPesquisarAtabela + "]/div[" + indexDaTabela + "]/table[1]/tr[2]/td[8]"
                    const dip = this.getXPathText(paginaHTML_DOSPREV_Formatada, xpathDIP)
                    beneficios[idexDoBeneficio].dip = dip;
                    console.log("dip", dip, "rmi", rmi);
                    idexDaDivParaPesquisarAtabela = numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio;
                    indexDaTabela = numeroMaxioParaProcurarATabelaDoBeneeficio;
                }
            }
        }


        return await beneficios
    }
    // /html/body/div/div[ 6 ]/div[ 3 ]/table[1]/tbody/tr[2]/td[2]
    // /html/body/div/div[ 6 ]/div[ 3 ]/table[1]/tr[2]/td[2]
    // /html/body/div/div[ 6 ]/div[ 1 ]/table[1]/tbody/tr[2]/td[2]
    // /html/body/div/div[ 6 ]/div[ 3 ]/table[2]/tbody/tr[2]/td[1]
    // /html/body/div/div[ 6 ]/div[ 3 ]/table[1]/tbody/tr[2]/td[8]
    // /html/body/div/div[" + z + "]/div[" + j + "]/table[1]/tbody/tr[2]/td[6]"
}