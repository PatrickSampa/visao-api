import { Request, Response } from 'express';
import { GetTarefaNupUseCase } from './GetTarefaNupUseCase';

export class GetTarefaNupController {
    constructor(private GetUsuarioNupUseCase: GetTarefaNupUseCase,) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { cookie, nup } = request.body;
        const {usuario_id} = request.params;
        try {
            const result = await this.GetUsuarioNupUseCase.execute({cookie, usuario_id, nup});
            response.status(200).json(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}