const { spawn } = require('child_process');

const childPython = spawn("python", ["--version"])

export function ChildPython(): Promise<Object> {
    return new Promise(function (resolve, reject) {
        childPython.stdout.on("data", (data) => {
            resolve(data)
        })
        childPython.stderr.on("data", (data) => {
            reject(data)
        })
    });
}