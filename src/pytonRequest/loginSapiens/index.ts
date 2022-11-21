import { Coockie } from '../../type/Cookie'
import { ILoginDTO } from '../../modules/LoginUsuario/LoginDTO'

export function LoginSapiens(login: ILoginDTO): Promise<string> {
    const { spawn } = require('child_process');
    console.log(login);

    // const childPython = spawn("python", ["--version"])
    const childPython = spawn("python", ["./src/pytonRequest/loginSapiens/loginPython.py", login.cpf, login.senha])
    let dataPython;
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", (data) => {
            dataPython = (`${data}`).replace("\r\n", "");
        })
        childPython.stderr.on("data", (data) => {
            reject(`${data}`)
        })
        childPython.on("close", (code) => {
            resolve(dataPython);
        })
    });
}