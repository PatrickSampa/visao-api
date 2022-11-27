"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestInformationForSamir = void 0;
const GetUsuario_1 = require("../GetUsuario");
const LoginUsuario_1 = require("../LoginUsuario");
class RequestInformationForSamir {
    async execute(data) {
        const coockie = await LoginUsuario_1.loginUseCase.execute(data);
        return await GetUsuario_1.getUsuarioUseCase.execute(coockie);
    }
}
exports.RequestInformationForSamir = RequestInformationForSamir;
//# sourceMappingURL=RequestInformationForSamir.js.map