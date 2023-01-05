// import { Buffer } from 'node:buffer';
import { PreparingForJSON } from '../../helps/PreparingForJSON';
const { spawn } = require('child_process');

export function UploadDocumenteForSapienInPython(coockie: string, operation:string, conteudo: string, documento_id: string, tipo_documento: string): Promise<any> {

    let conteudo1 = "";
    let conteudo2 = "";
    let conteudo3 = "";
    let conteudo4 = "";
    for(let i = 0 ; i < conteudo.length; i++){
        if(i <= 20000){
            conteudo1 += conteudo[i];
        }else if(i > 20000 && i <= 40000){
            conteudo2 += conteudo[i];
        }else if(i > 40000 && i <= 60000){
            conteudo3 += conteudo[i];
        }else if(i > 60000 && i <= 80000){
            conteudo4 += conteudo[i];
        }
    }
    console.log(conteudo1 == "", conteudo2 == "", conteudo3 == "", conteudo4 == "", coockie, operation, documento_id, tipo_documento);
    // const childPython = spawn("python", ["--version"])
    const childPython = spawn("python3", ["./src/pytonRequest/UploadDocumenteForSapienInPython/requestPython.py", coockie, operation, documento_id, tipo_documento, conteudo1, conteudo2, conteudo3, conteudo4])
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