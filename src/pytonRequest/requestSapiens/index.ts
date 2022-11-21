

export function RequestSapiens(coockie:string): Promise<Object> {
    const { spawn } = require('child_process');

    // const childPython = spawn("python", ["--version"])
    const childPython = spawn("python", ["./src/pytonRequest/requestSapiens/requestPython.py", coockie])
    let dataPython;
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", (data) => {
            // dataPython = data;
            dataPython = JSON.stringify(data.toString().replace("\r\n", ""));
            var jsonString = JSON.stringify(data.toString().replace("\r\n", ""), replacer);;
            dataPython = JSON.parse(dataPython);
            //console.log(jsonString);
        })
        childPython.stderr.on("data", (data) => {
            reject(`${data}`)
        })
        childPython.on("close", (code) => {
            // resolve(`${dataPython}`);
            resolve(dataPython);
        })
    });
}
function replacer(key, value) {
   console.log(value);
    return value;
  }