import { Request, Response } from "express";
import { IGetInformationsFromSapiensDTO } from "../../DTO/GetInformationsFromSapiensDTO";
import { VerificadorDeDupliciadeUseCase } from "./VerificadorDeDupliciadeUseCase";

export class VerificadorDeDupliciadeController {
    constructor(private atualizacaoDossiePrevidenciarioUseCase: VerificadorDeDupliciadeUseCase,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const data: IGetInformationsFromSapiensDTO = request.body;
        try {
            const result = await this.atualizacaoDossiePrevidenciarioUseCase.execute(data);
            response.status(200).json(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}