// import { Buffer } from 'node:buffer';
import { PreparingForJSON } from '../../helps/PreparingForJSON';

export function RequestSapiens(coockie: string, operation:string): Promise<any> {
    const { spawn } = require('child_process');

    // const childPython = spawn("python", ["--version"])
    const childPython = spawn("python", ["./src/pytonRequest/requestSapiens/requestPython.py", coockie, operation])
    let dataPythonResponse = [];
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", async (data: Buffer) => {
            // dataPython = data;
            // console.log(data.toString()[1593],data.toString()[1594],data.toString()[1595],data.toString()[1596],data.toString()[1597], data.toString()[1598],data.toString()[1599],data.toString()[1600],data.toString()[1601],data.toString()[1602],data.toString()[1603])
            // console.log(data[1593],data[1594],data[1595],data[1596],data[1597], data[1598],data[1599],data[1600],data[1601],data[1602],data[1603])
            // console.log(data.length);
            // console.log(Buffer.from(`Ff`));
            // console.log(Buffer.from(`Ff`).toString());
            // const aspaSimples = Buffer.from(`Ff`);
            // console.log(aspaSimples[0]);
            // console.log(aspaSimples[1]);
            // console.log(aspaSimples.length);
            const preparingForJSON = new PreparingForJSON();
            // console.log(`${data}`)
            try {
                // console.log("data string Leng",data.length)
                if (data.length > 2) {
                    let jsonFuncionou = JSON.parse(await preparingForJSON.execute(data))
                    console.log(jsonFuncionou[0].result.records.length)
                    dataPythonResponse.push(jsonFuncionou[0].result.records);
                }

            } catch (err) {
                console.log(err)
                console.log("error")
            }

        })
        childPython.stderr.on("data", (data) => {
            reject(`${data}`)
        })
        childPython.on("close", (code) => {
            // resolve(`${dataPython}`);
            resolve(dataPythonResponse[0]);
        })
    });
}
function replacer(key, value) {
    console.log(value);
    return value;
}