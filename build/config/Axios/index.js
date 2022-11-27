"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sapiens = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SAPIENS_URL = process.env.SAPIENS_URL;
exports.Sapiens = axios_1.default.create({
    baseURL: SAPIENS_URL,
});
//# sourceMappingURL=index.js.map