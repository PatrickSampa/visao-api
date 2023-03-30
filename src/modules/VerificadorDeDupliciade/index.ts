import { VerificadorDeDupliciadeController } from './VerificadorDeDupliciadeController';
import { VerificadorDeDupliciadeUseCase } from './VerificadorDeDupliciadeUseCase';
export const verificadorDeDupliciadeUseCase = new VerificadorDeDupliciadeUseCase();
export const verificadorDeDupliciadeController = new VerificadorDeDupliciadeController(verificadorDeDupliciadeUseCase);