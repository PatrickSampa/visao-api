"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.swaggerDefinition = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const urlAPI = `http://localhost:${PORT}`;
const PORT_DOCKER = process.env.PORT_DOCKER;
const urlDOCKER = `http://localhost:${PORT_DOCKER}`;
exports.swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'VISÃO. API to perform screening in SAPIENS',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data from SAPIENS.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'GITHUB PROJECT',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: urlDOCKER,
            description: 'Development server in the docker',
        },
        {
            url: urlAPI,
            description: 'Development server',
        },
    ],
};
exports.Options = {
    swaggerDefinition: exports.swaggerDefinition,
    apis: ['./src/routes/*.ts', './src/entities/*.ts', './src/modules/*/*.ts', './src/type/*.ts'],
};
//# sourceMappingURL=index.js.map