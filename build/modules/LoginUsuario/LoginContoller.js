"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
class LoginController {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    async handle(request, response) {
        const { cpf, senha } = request.body;
        try {
            const cookie = await this.loginUseCase.execute({ cpf, senha });
            response.status(200).json(cookie);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=LoginContoller.js.map