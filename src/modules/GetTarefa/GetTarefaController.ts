import { Request, Response } from 'express';
import { GetTarefaUseCase } from './GetTarefaUseCase';

export class GetTarefaController {
    constructor(private GetUsuarioUseCase: GetTarefaUseCase,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { Coockie, etiqueta } = request.body;
        const {idUsuario} = request.params;
        try {
            const cookie = await this.GetUsuarioUseCase.execute(Coockie, idUsuario, etiqueta);
            response.status(200).json(cookie);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}