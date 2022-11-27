"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const loginSapiens_1 = require("../../pytonRequest/loginSapiens");
class LoginUseCase {
    async execute(data) {
        return await (0, loginSapiens_1.LoginSapiens)(data);
    }
}
exports.LoginUseCase = LoginUseCase;
//# sourceMappingURL=LoginUseCase.js.map