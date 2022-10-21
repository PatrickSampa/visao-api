import { Router } from "express";
import { type } from "os";
import { Sapiens } from "../config/Axios";
import bodyParser from 'body-parser';
import { getUsuario, login } from '../helps/getUsuario';
const { parse, stringify } = require('flatted');
const request = require('request');
const url = "https://sapiens.agu.gov.br/"
const urlRoute = "https://sapiens.agu.gov.br/route"
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
    let login12: any;
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
    let checkLogin: Coockie;

    let cookieVerdadeiro = await login(url + "login_check", body);
    var cookieText = 'dtCookie=' + csrf_token;
    var cookieText1 = 'dtLatC=26';
    var cookieText2 = '';


    let body2 = {
        "action": "SapiensMain_Usuario",
        "method": "getUsuario",
        "data": [{
            "sessao": "True",
            "fetch": ["colaborador",
                "colaborador.modalidadeColaborador",
                "colaborador.lotacoes",
                "colaborador.lotacoes.setor",
                "colaborador.lotacoes.setor.especieSetor",
                "colaborador.lotacoes.setor.unidade",
                "colaborador.lotacoes.setor.unidade.modalidadeOrgaoCentral",
                "colaborador.lotacoes.setor.unidade.generoSetor"],
            "filter": [{
                "property": "colaborador.lotacoes.id",
                "value": "isNotNull"
            },
            {
                "property": "colaborador.lotacoes.setor.ativo",
                "value": "eq:1"
            }],
            "page": 1,
            "start": 0,
            "limit": 25
        }],
        "type": "rpc",
        "tid": 0
    }
    let bodyParser = await JSON.parse(JSON.stringify(body2));
    //console.log(`${cookieVerdadeiro.dtCookie}; ${cookieVerdadeiro.PHPSESSID}`);
    const coockeiSapiens = await JSON.parse(JSON.stringify({
        'Cookie': cookieVerdadeiro.PHPSESSID,
    }));
    let superCookie = { 'Cookie': cookieVerdadeiro.PHPSESSID }
    try {
        res.status(200).send(await getUsuario(urlRoute, body2, superCookie));
    } catch (error) {
        res.status(400).send({ errors: error });
    }

})


