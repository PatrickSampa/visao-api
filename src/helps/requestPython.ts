

export function ChildPython(): Promise<Object> {
    const { spawn } = require('child_process');

    const childPython = spawn("python3", ["@/src/modules/requestPython.py"])
    let dataPython;
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", (data) => {
            dataPython = data;
        })
        childPython.stderr.on("data", (data) => {
            reject(`${data}`)
        })
        childPython.on("close", (code) => {
            resolve(`${dataPython}`);
        })
    });
}