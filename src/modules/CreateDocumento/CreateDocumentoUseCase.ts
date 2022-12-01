import { ICreateDocumentDTO } from '../../DTO/CreateDocumentDTO';
import { RequestSapiens } from '../../pytonRequest/requestSapiens';
import { RequestCreateDocumento } from '../../sapiensOperations/resquest/RequestCreateDocumento';
export class CreateDocumentoUseCase {
    constructor(private RequestCreateDocumento:RequestCreateDocumento){};
    async execute(data: ICreateDocumentDTO): Promise<any> {

        const playload = await this.RequestCreateDocumento.execute(data.pasta_id, data.usuario_nome, data.usuario_setor, data.tarefa_id, data.tid, data.tipoDocumento_id, data.modelo_id);
        
        const response = (await RequestSapiens(data.cookie, playload))
        
        return response;
    }
}