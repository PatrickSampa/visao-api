import { UploadDocumenteForSapienInPython } from "../../pytonRequest/UploadDocumenteForSapienInPython";

export class UploadDocumentUseCase {

    async execute(Coockie: string, fileName: string, conteudo: string, documento_id: string, tipo_documento: string): Promise<any> {
        return await UploadDocumenteForSapienInPython(Coockie, fileName, conteudo, documento_id, tipo_documento);
    }
}