const request = require('request');

type Coockie = {
    PHPSESSID: string,
    dtCookie: string
}
type setCoockieHeadrs = {
    "set-cookie": []
}

export function getUsuario(url: string, data, headers: object): Promise<Object> {
    return new Promise(function (resolve, reject) {
        request.post({
            url, data, headers
        }, async function (error, response, body) {
            //console.log(response);
            console.log(response.headers);
            console.log(error);
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}
export function login(url: string, body): Promise<Coockie> {
    return new Promise(function (resolve, reject) {
        request.post(url, body, async function (error, response, body) {
            if (!error && response.statusCode === 302) {
                // console.log('statusCode:', response && response.statusCode);
                // console.log(response.headers);
                //console.log('statusCode:', response && response.Cookies);
                /*console.error('error:', error);
                
                console.log('headrs em fuction:', response && response.headers);
        */
                //testar o JSON.parse(response.headers);
                let headrs = response.headers;
                let { "set-cookie": any } = await headrs;
                let cookieHeards = await { "set-cookie": any };
                let setCoockieHeadrs: setCoockieHeadrs = await cookieHeards,
                    cookie: Array<string> = setCoockieHeadrs["set-cookie"];
                //console.log(cookie);
                let cookies: Coockie = {
                    PHPSESSID: cookie[0].split(';')[0].replace(":", "="),
                    dtCookie: cookie[1].split(';')[0].replace(":", "=")
                }
                //console.log(cookies)
                resolve(cookies);
            } else {
                reject(error);
            }
        });
    });
}