import { Request, Response } from 'express';
import { InsertSapiensMinutasUseCase } from './InsertSapiensMinutasUseCase';
import { IInserirMemoriaCalculoDTO } from '../../DTO/InserirMemoriaCalculoDTO';

export class InsertSapiensMinutasController {
    constructor(private requestInformationForSamir: InsertSapiensMinutasUseCase,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        console.log("re chegou")
        const data: IInserirMemoriaCalculoDTO = request.body;
        try {
            const result = await this.requestInformationForSamir.execute(data);
            response.status(200).json(result);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}