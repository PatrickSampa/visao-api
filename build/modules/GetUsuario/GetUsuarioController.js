"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsuarioController = void 0;
class GetUsuarioController {
    constructor(GetUsuarioUseCase) {
        this.GetUsuarioUseCase = GetUsuarioUseCase;
    }
    async handle(request, response) {
        const { Coockie } = request.body;
        try {
            const cookie = await this.GetUsuarioUseCase.execute(Coockie);
            response.status(200).json(cookie);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
exports.GetUsuarioController = GetUsuarioController;
//# sourceMappingURL=GetUsuarioController.js.map