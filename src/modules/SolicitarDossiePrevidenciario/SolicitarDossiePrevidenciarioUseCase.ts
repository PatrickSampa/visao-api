import { SolicitarDossiePrevidenciarioDTO } from "../../DTO/SolicitarDossiePrevidenciarioDTO";
import { RequestHeaders } from "../../sapiensOperations/resquest/RequestHeaders";
import axios from 'axios';
import { RequestHeadersLogingCheck } from "../../sapiensOperations/resquest/RequestHeadersLoginCheck";
var querystring = require('querystring');

export class SolicitarDossiePrevidenciarioUseCase {

    async execute(data: SolicitarDossiePrevidenciarioDTO): Promise<string> {
        const requestHeaderUploadArquivo = new RequestHeaders;
        const headers = await requestHeaderUploadArquivo.execute(data.cookie);
        const baseURL = `https://sapiens.agu.gov.br/servicos/consultaDossieINSS`
        const body = querystring.stringify({pessoaId: data.pessoaId, pastaId: data.pastaId}) //`pessoaId=${data.pessoaId}&pastaId=${data.pastaId}}`
        return await axios.post(baseURL, body, {headers}).then(response =>{
            //console.log(response.status)
            //console.log(response.data).
            return response.data;
        }).catch(error =>{
            console.log(error)
            return new Error(error);
        })
        // return await UploadDocumenteForSapienInPython(Coockie, fileName, conteudo, documento_id, tipo_documento);
    }
}