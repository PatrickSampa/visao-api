"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestInformationForSamirController = void 0;
class RequestInformationForSamirController {
    constructor(requestInformationForSamir) {
        this.requestInformationForSamir = requestInformationForSamir;
    }
    async handle(request, response) {
        const { cpf, senha } = request.body;
        try {
            const cookie = await this.requestInformationForSamir.execute({ cpf, senha });
            response.status(200).json(cookie);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}
exports.RequestInformationForSamirController = RequestInformationForSamirController;
//# sourceMappingURL=RequestInformationForSamirController.js.map