"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const request = require('request');
function login(url, body) {
    return new Promise(function (resolve, reject) {
        request.post(url, body, async function (error, response, body) {
            if (!error && response.statusCode === 302) {
                let headrs = response.headers;
                let { "set-cookie": any } = await headrs;
                let cookieHeards = await { "set-cookie": any };
                let setCoockieHeadrs = await cookieHeards, cookie = setCoockieHeadrs["set-cookie"];
                let cookies = {
                    PHPSESSID: cookie[0].split(';')[0].replace(":", "="),
                    dtCookie: ""
                };
                resolve(cookies);
            }
            else {
                reject(error);
            }
        });
    });
}
exports.login = login;
//# sourceMappingURL=getUsuario.js.map