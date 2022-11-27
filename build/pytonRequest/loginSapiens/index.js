"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSapiens = void 0;
function LoginSapiens(login) {
    const { spawn } = require('child_process');
    console.log(login);
    const childPython = spawn("python", ["./src/pytonRequest/loginSapiens/loginPython.py", login.cpf, login.senha]);
    let dataPython;
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", (data) => {
            dataPython = (`${data}`).replace("\r\n", "");
        });
        childPython.stderr.on("data", (data) => {
            reject(`${data}`);
        });
        childPython.on("close", (code) => {
            resolve(dataPython);
        });
    });
}
exports.LoginSapiens = LoginSapiens;
//# sourceMappingURL=index.js.map