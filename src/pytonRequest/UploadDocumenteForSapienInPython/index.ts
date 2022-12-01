// import { Buffer } from 'node:buffer';
import { PreparingForJSON } from '../../helps/PreparingForJSON';

export function UploadDocumenteForSapienInPython(coockie: string, operation:string, conteudo: string, documento_id: string, tipo_documento: string): Promise<any> {
    const { spawn } = require('child_process');

    // const childPython = spawn("python", ["--version"])
    const childPython = spawn("python", ["./src/pytonRequest/UploadDocumenteForSapienInPython/requestPython.py", coockie, operation, conteudo, documento_id, tipo_documento])
    let dataPythonResponse = [];
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", async (data: Buffer) => {
            
            const preparingForJSON = new PreparingForJSON();
            console.log("data", `${data}`);
            
            try {
                // console.log("data string Leng",data.length)
                if (data.length > 2) {
                    let jsonFuncionou = JSON.parse(await preparingForJSON.execute(data))
                    dataPythonResponse.push(jsonFuncionou);
                }

            } catch (err) {
                console.log(err)
                console.log("error")
            }

        })
        childPython.stderr.on("data", (data) => {
            console.log(`${data}`);
            reject(`${data}`)
        })
        childPython.on("close", (code) => {
            // resolve(`${dataPython}`);
            resolve(dataPythonResponse[0]);
        })
    });
}