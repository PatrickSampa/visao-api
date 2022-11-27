"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const RequestInformationForSamir_1 = require("../modules/RequestInformationForSamir");
exports.routerAuth = (0, express_1.Router)();
exports.routerAuth.post("/teste", async (req, res) => {
    return RequestInformationForSamir_1.requestInformationForSamirController.handle(req, res);
});
//# sourceMappingURL=RequestSapiens.routes.js.map