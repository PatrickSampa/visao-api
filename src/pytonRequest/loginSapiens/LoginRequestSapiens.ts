import { ILoginDTO } from "../../DTO/LoginDTO";
import { parse } from 'node-html-parser';

export class RequestLoginSapiens{
    constructor(private login: ILoginDTO) {}
    async  handle(): Promise<string> {
        var cookie: string;

        return cookie
    }
}