"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSapiens = void 0;
function RequestSapiens(coockie, procedimento) {
    const { spawn } = require('child_process');
    const childPython = spawn("python", ["./src/pytonRequest/requestSapiens/requestPython.py", coockie, procedimento]);
    let dataPythonResponse = [];
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", (data) => {
            let dataPython = JSON.stringify(data.toString().replace("\r\n", ""));
            var jsonString = JSON.stringify(data.toString().replace("\r\n", ""), replacer);
            ;
            dataPythonResponse.push(JSON.parse(dataPython));
            console.log("dataPython");
            console.log(`${data}`);
            console.log("dataPython");
        });
        childPython.stderr.on("data", (data) => {
            reject(`${data}`);
        });
        childPython.on("close", (code) => {
            resolve(dataPythonResponse);
        });
    });
}
exports.RequestSapiens = RequestSapiens;
function replacer(key, value) {
    console.log(value);
    return value;
}
//# sourceMappingURL=index.js.map