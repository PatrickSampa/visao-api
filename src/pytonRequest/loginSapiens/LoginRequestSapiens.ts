import axios from "axios";
import { ILoginDTO } from "../../DTO/LoginDTO";
import { parse, HTMLElement  } from 'node-html-parser';


export class RequestLoginSapiens {
    private urlSapiens = 'https://sapiens.agu.gov.br/';
    private extesionUrlSapiens_loginCheck = 'login_check'
    private extesionUrlSapiens_login = 'login'
    private sessao = axios.create();
    constructor(private login: ILoginDTO) { }
    async handle(): Promise<string> {
        var cookie: string;
        let token = await this.getInicialToken();
        console.log("", token);
        return cookie
    }
    private async getInicialToken(): Promise<string> {
        const getSapiensExternalPage = await this.sessao.get(`${this.urlSapiens}${this.extesionUrlSapiens_login}`);
        const htmlPageLogin = getSapiensExternalPage.data;
        const root: HTMLElement  = parse(htmlPageLogin);
        const token = root.querySelector('input')!.getAttribute('value')!;
        return token;
    }
}