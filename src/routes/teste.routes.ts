import { Router } from "express";
import { type } from "os";
import { Sapiens } from "../config/Axios";
const { parse, stringify } = require('flatted');
const request = require('request');
const url = "https://sapiens.agu.gov.br/"
//const sessao = request.session();

export const routerAuth = Router();

/**
 * @swagger
 * /teste:
 *   get:
 *     summary: Returns the list of all the Category
 *     tags: [Teste]
 *     responses:
 *       401:
 *         description:  Unauthorized
 *       200:
 *         description: The list of the Category
 */
type setCoockieHeadrs = {
    "set-cookie": []
}
type Coockie = {
    PHPSESSID: string,
    dtCookie: string
}

routerAuth.get("/teste", async (req, res) => {
    let csrf_token: string;
    let login: any;
    await Sapiens.get(url + "login").then(async (resposta) => {
        csrf_token = await resposta.data.split("\n").at(-3).split("value=").at(1).split('"').at(1);
    }).catch(err => {
    })
    console.log(csrf_token);
    let body = {
        _csrf_token: csrf_token,
        _username: "02127337298",
        _password: "Senhasenh4",
        _submit: "Login"
    }
    //

    let headrs;
    let PHPSESSID: string;
    let dtCookie: string;
    let cookieVerdadeiro: Coockie;
    let checkLogin: Coockie;
    request.post(url + "login_check", body, async function (error, response, body) {
        console.log('statusCode:', response && response.statusCode);
        console.log('statusCode:', response && response.Cookies);
        /*console.error('error:', error);
        
        console.log('headrs em fuction:', response && response.headers);
*/
        headrs = response.headers;
        let { "set-cookie": any } = await headrs;
        let cookieHeards = await { "set-cookie": any };
        let setCoockieHeadrs: setCoockieHeadrs = await cookieHeards,
            cookie = setCoockieHeadrs["set-cookie"],
            cookies: Coockie = {
                PHPSESSID: cookie[0],
                dtCookie: cookie[1]
            }
        cookieVerdadeiro = await cookies;
       // await console.log(await cookieVerdadeiro);
       
    });
    var cookieText = 'dtCookie=' + csrf_token;
    var cookieText1 = 'dtLatC=26';
    var cookieText2 = '';
    console.log("PHPSESSID: " + PHPSESSID);
    console.log("Coockie: " + cookieVerdadeiro);
    //console.log(request.cookie(cookieText1));
    //console.log(request.cookie(cookieText2));


    if (checkLogin) {
        let body2 = {
            "action": "SapiensMain_Usuario",
            "method": "getUsuario",
            "data": [
                {
                    "sessao": true,
                    "fetch": [
                        "colaborador",
                        "colaborador.modalidadeColaborador",
                        "colaborador.lotacoes",
                        "colaborador.lotacoes.setor",
                        "colaborador.lotacoes.setor.especieSetor",
                        "colaborador.lotacoes.setor.unidade",
                        "colaborador.lotacoes.setor.unidade.modalidadeOrgaoCentral",
                        "colaborador.lotacoes.setor.unidade.generoSetor"
                    ],
                    "filter": [
                        {
                            "property": "colaborador.lotacoes.id",
                            "value": "isNotNull"
                        },
                        {
                            "property": "colaborador.lotacoes.setor.ativo",
                            "value": "eq:1"
                        }
                    ],
                    "page": 1,
                    "start": 0,
                    "limit": 25
                }
            ],
            "type": "rpc",
            "tid": 1
        }
        await Sapiens.post("route", body2).then(response => {
            let test = { response: response.data, message: "aqui" }
            res.status(201).send("OK")
        }).catch(err => {
            console.log(err.message)
            res.status(400).send({ error: err.message });
        })
    }
})