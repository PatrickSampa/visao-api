

export function ChildPython(): Promise<Object> {
    const { spawn } = require('child_process');

    // const childPython = spawn("python", ["--version"])
    const childPython = spawn("python", ["requestPython.py"])
    let dataPython;
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", (data) => {
            console.log(`${data}`)
            dataPython = data;
        })
        childPython.stderr.on("data", (data) => {
            console.log(`${data}`)
            reject(`${data}`)
        })
        childPython.on("close", (code) => {
            resolve(`${dataPython}`);
        })
    });
}