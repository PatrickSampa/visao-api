import { AtualizacaoDossiePrevidenciarioController } from "./AtualizacaoDossiePrevidenciarioController";
import { AtualizacaoDossiePrevidenciarioUseCase } from "./AtualizacaoDossiePrevidenciarioUseCase";

export const atualizacaoDossiePrevidenciarioUseCase = new AtualizacaoDossiePrevidenciarioUseCase();
export const atualizacaoDossiePrevidenciarioController = new AtualizacaoDossiePrevidenciarioController(atualizacaoDossiePrevidenciarioUseCase);

