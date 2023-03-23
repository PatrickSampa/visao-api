import { Request, Response } from 'express';
import { IGetInformationsFromSapiensDTO } from '../../DTO/GetInformationsFromSapiensDTO';
import { VerificadorValidadeDossiePrevidenciarioUseCase } from './VerificadorValidadeDossiePrevidenciarioUseCase';

export class VerificadorValidadeDossiePrevidenciarioController {
    constructor(private verificadorValidadeDossiePrevidenciarioUseCase: VerificadorValidadeDossiePrevidenciarioUseCase,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const data: IGetInformationsFromSapiensDTO = request.body;
        try {
            const result = await this.verificadorValidadeDossiePrevidenciarioUseCase.execute(data);
            response.status(200).json(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}

