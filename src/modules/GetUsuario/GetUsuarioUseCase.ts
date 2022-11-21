import { RequestSapiens } from "../../pytonRequest/requestSapiens";

export class GetUsuarioUseCase{

    async execute(cookie: string): Promise<object> {
        return await RequestSapiens(cookie);
    }
}