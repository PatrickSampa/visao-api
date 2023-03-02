import { IGetArvoreDocumentoDTO } from "../../../DTO/GetArvoreDocumentoDTO";
import { ResponseArvoreDeDocumento } from "../../../sapiensOperations/response/ResponseArvoreDeDocumento";
import { getArvoreDocumentoUseCase } from "../../GetArvoreDocumento";

export async function processoEhAdministrativo(tarefa: any, cookie: string):Promise<boolean>{
    const objectGetArvoreDocumento: IGetArvoreDocumentoDTO = { nup: tarefa.pasta.NUP, chave: tarefa.pasta.chaveAcesso, cookie, tarefa_id: tarefa.id }
    let arrayDeDocumentos: ResponseArvoreDeDocumento[] = await getArvoreDocumentoUseCase.execute(objectGetArvoreDocumento);
    if(arrayDeDocumentos.length > 5){
        return false;
    }else{
        return true;
    }
    
}