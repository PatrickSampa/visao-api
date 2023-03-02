import { RequestSapiens } from "../../pytonRequest/requestSapiens";
import { ResponseGetPasta } from "../../sapiensOperations/response/ResponseGetPasta";
import { RequestGetPasta } from "../../sapiensOperations/resquest/RequestGetPasta";



export class GetPastaUseCase {
    constructor(private RequestGetPasta:RequestGetPasta){};
    async execute(nup: string,cookie: string): Promise<ResponseGetPasta> {

        const getPasta = await this.RequestGetPasta.execute(nup);
        
        const response: ResponseGetPasta = await RequestSapiens(cookie, getPasta);
        
        return response;
    }
}