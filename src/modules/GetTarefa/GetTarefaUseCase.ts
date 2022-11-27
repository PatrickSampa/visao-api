import { RequestSapiens } from "../../pytonRequest/requestSapiens";
import { RequestGetTarefa } from "../../sapiensOperations/resquest/RequestGetTarefa";

export class GetTarefaUseCase {
    constructor(private RequestGetTarefa:RequestGetTarefa){};
    async execute(cookie: string, idUsuario: string, etiqueta?: string): Promise<any> {

        const getTarefa = await this.RequestGetTarefa.execute(idUsuario, etiqueta);
        
        const response = (await RequestSapiens(cookie, getTarefa))
        
        return response;
    }
}