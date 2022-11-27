"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.loginUseCase = void 0;
const LoginUseCase_1 = require("./LoginUseCase");
const LoginContoller_1 = require("./LoginContoller");
const loginUseCase = new LoginUseCase_1.LoginUseCase();
exports.loginUseCase = loginUseCase;
const loginController = new LoginContoller_1.LoginController(loginUseCase);
exports.loginController = loginController;
//# sourceMappingURL=index.js.map