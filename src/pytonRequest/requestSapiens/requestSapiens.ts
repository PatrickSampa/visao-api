import axios from "axios";
import { RequestHeaders } from "../../sapiensOperations/resquest/RequestHeaders";
import { Coockie } from '../../type/Cookie';

export async function requestSapiens(cookie: string, payload: string ): Promise<any>{
    console.log("AQUI")
        

        const requestHeader = new RequestHeaders;
        const headers = await requestHeader.execute(cookie);
        const baseURL = `https://sapiens.agu.gov.br/route`
        headers.Coockie.replace("\n", "")
        const data = await JSON.parse(payload);
        console.log(headers);
        return await axios.get(baseURL, {headers, data}).then(response =>{
            return response.data;
        }).catch(error =>{
            console.log(error)
            return new Error(error);
        })
}