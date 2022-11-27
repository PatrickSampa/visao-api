"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
app_1.app.get('/', (req, res) => res.send('Hello World 100!'));
app_1.app.listen(PORT, () => console.log("Visao runing in PORT " + PORT));
//# sourceMappingURL=server.js.map