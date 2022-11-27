"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestInformationForSamirController = exports.requestInformationForSamir = void 0;
const RequestInformationForSamir_1 = require("./RequestInformationForSamir");
const RequestInformationForSamirController_1 = require("./RequestInformationForSamirController");
const requestInformationForSamir = new RequestInformationForSamir_1.RequestInformationForSamir();
exports.requestInformationForSamir = requestInformationForSamir;
const requestInformationForSamirController = new RequestInformationForSamirController_1.RequestInformationForSamirController(requestInformationForSamir);
exports.requestInformationForSamirController = requestInformationForSamirController;
//# sourceMappingURL=index.js.map