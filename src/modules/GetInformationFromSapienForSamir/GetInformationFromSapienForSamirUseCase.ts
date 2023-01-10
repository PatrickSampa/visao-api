
import { getUsuarioUseCase } from '../GetUsuario';
import { loginUseCase } from '../LoginUsuario';
import { getTarefaUseCase } from '../GetTarefa';
import { IGetInformationsFromSapiensDTO } from '../../DTO/GetInformationsFromSapiensDTO';
import { IGetArvoreDocumentoDTO } from '../../DTO/GetArvoreDocumentoDTO';
import { getArvoreDocumentoUseCase } from '../GetArvoreDocumento/index';
import { IInformationsForCalculeDTO } from '../../DTO/InformationsForCalcule';


export class GetInformationFromSapienForSamirUseCase {

    async execute(data: IGetInformationsFromSapiensDTO): Promise<any> {
        const cookie = await loginUseCase.execute(data.login);
        const usuario = (await getUsuarioUseCase.execute(cookie));

        const usuario_id = `${usuario[0].id}`;

        const usuario_nome = `${usuario[0].nome}`;
        var tidNumber = 3;
        let response: Array<IInformationsForCalculeDTO> = [];

        const tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta });

        for (var i = 0; i < tarefas.length; i++) {
            const objectGetArvoreDocumento: IGetArvoreDocumentoDTO = { nup: tarefas[i].pasta.NUP, chave: tarefas[i].pasta.chaveAcesso, cookie, tarefa_id: tarefas[i].id }
            const arrayDeDocumentos = (await getArvoreDocumentoUseCase.execute(objectGetArvoreDocumento)).reverse();  
            
            const objectDosPrev = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
           
            if (objectDosPrev != null) {
               
                
                console.log({ nome: objectDosPrev.documentoJuntado.tipoDocumento.sigla, id: objectDosPrev.documentoJuntado.componentesDigitais[0].id });

                const citacao = this.coletarCitacao(arrayDeDocumentos)
                let informationsForCalculeDTO: IInformationsForCalculeDTO
                
                response.push(informationsForCalculeDTO);
            }
            if (i == tarefas.length - 1) {
                return response
            }
            tidNumber++;
        }

    }
    coletarCitacao(arrayDeDocumentos: ResponseArvoreDeDocumento[]): string{
        const ObjectCitacao = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.nome == "CITAÇÃO");
        if(ObjectCitacao == null) {
            return null
        }
        const ArrayDataCitacao = ObjectCitacao.documentoJuntado.dataHoraProducao.date.split(" ")[0].split("-");
        const dataCitacao: string = `${ArrayDataCitacao[2]}/${ArrayDataCitacao[1]}/${ArrayDataCitacao[0]}`
        console.log(dataCitacao)
        return dataCitacao;
    }
}