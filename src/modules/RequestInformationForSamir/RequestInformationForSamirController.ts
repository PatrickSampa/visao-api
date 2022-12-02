import { Request, Response } from 'express';
import { RequestInformationForSamir } from './RequestInformationForSamir';

export class RequestInformationForSamirController {
    constructor(private requestInformationForSamir: RequestInformationForSamir,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { login, etiqueta, minutas } = request.body;
        try {
            const cookie = await this.requestInformationForSamir.execute({ login, etiqueta, minutas});
            response.status(200).json(cookie);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}