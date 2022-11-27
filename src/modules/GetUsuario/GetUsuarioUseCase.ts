import { RequestSapiens } from "../../pytonRequest/requestSapiens";
import { RequestGetUsuario } from "../../sapiensOperations/resquest/RequestGetUsuario";

export class GetUsuarioUseCase {
    constructor(private RequestGetUsuario:RequestGetUsuario){};
    async execute(cookie: string): Promise<any> {

        const getTarefa = await this.RequestGetUsuario.execute();
        
        const response = (await RequestSapiens(cookie, getTarefa))
        
        return response;
    }
}