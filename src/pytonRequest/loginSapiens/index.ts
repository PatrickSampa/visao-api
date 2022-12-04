import { Coockie } from '../../type/Cookie'
import { ILoginDTO } from '../../DTO/LoginDTO'

export function LoginSapiens(login: ILoginDTO): Promise<string> {
    const { spawn } = require('child_process');
    // const childPython = spawn("python", ["--version"])
    const childPython = spawn("python", ["./src/pytonRequest/loginSapiens/loginPython.py", login.cpf, login.senha])
    let dataPython;
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", (data) => {
            dataPython = (`${data}`).replace("\r\n", "");
        })
        childPython.stderr.on("data", (data) => {
            console.log(`${data} login`);
            reject(`${data}`)
        })
        childPython.on("close", (code) => {
            resolve(dataPython);
        })
    });
}