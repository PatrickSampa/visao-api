import { RequestGetPasta } from "../../sapiensOperations/resquest/RequestGetPasta";
import { GetPastaUseCase } from "./GetPastaUseCase";

export const requestGetPasta = new RequestGetPasta();
export const getPastaUseCase = new GetPastaUseCase(requestGetPasta);