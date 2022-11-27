"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("../config/swagger");
const RequestSapiens_routes_1 = require("./RequestSapiens.routes");
exports.routes = (0, express_1.default)();
exports.routes.use("/", RequestSapiens_routes_1.routerAuth);
const swaggerSpec = (0, swagger_jsdoc_1.default)(swagger_1.Options);
exports.routes.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.routes.use((req, res, next) => {
    const error = new Error("I`m Batman!!");
    next(error);
});
exports.routes.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: error.message });
});
//# sourceMappingURL=index.js.map