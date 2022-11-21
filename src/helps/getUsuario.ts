const request = require('request');

type Coockie = {
    PHPSESSID: string,
    dtCookie: string
}
type setCoockieHeadrs = {
    "set-cookie": []
}

export function login(url: string, body): Promise<Coockie> {
    return new Promise(function (resolve, reject) {
        request.post(url, body, async function (error, response, body) {
            if (!error && response.statusCode === 302) {
                let headrs = response.headers;
                let { "set-cookie": any } = await headrs;
                let cookieHeards = await { "set-cookie": any };
                let setCoockieHeadrs: setCoockieHeadrs = await cookieHeards,
                    cookie: Array<string> = setCoockieHeadrs["set-cookie"];
                //console.log(cookie);
                let cookies: Coockie = {
                    PHPSESSID: cookie[0].split(';')[0].replace(":", "="),
                    dtCookie: ""
                }
                //console.log(cookies)
                resolve(cookies);
            } else {
                reject(error);
            }
        });
    });
}