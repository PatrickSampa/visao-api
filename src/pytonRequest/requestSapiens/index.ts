// import { Buffer } from 'node:buffer';
import { PreparingForJSON } from '../../helps/PreparingForJSON';
import axios from "axios";
import { RequestHeaderUploadArquivo } from "../../sapiensOperations/resquest/RequestHeaderUploadArquivo";
import { RequestHeaders } from '../../sapiensOperations/resquest/RequestHeaders';

export async function RequestSapiens(coockie: string, operation:string): Promise<any> {
    const response = await requestSapiens(coockie,operation); 
    return response[0].result.records;
}
async function requestSapiens(cookie: string, payload: string ): Promise<any>{
    console.log("AQUI")
    console.log(cookie)
    const requestHeaderUploadArquivo = new RequestHeaders;
    const headers = await requestHeaderUploadArquivo.execute(cookie);
        const baseURL = `https://sapiens.agu.gov.br/route`
        const data = await JSON.parse(payload);
        console.log(headers);
        console.log(data.method);
        return await axios.post(baseURL, data ,{headers}).then(response =>{
            console.log(response.status)
            console.log(response.data)
            return response.data;
        }).catch(error =>{
            console.log(error)
            return new Error(error);
        })
}