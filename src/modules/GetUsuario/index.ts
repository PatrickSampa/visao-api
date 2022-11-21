import { GetUsuarioUseCase } from './GetUsuarioUseCase';
import { GetUsuarioController } from './GetUsuarioController';

const getUsuarioUseCase = new GetUsuarioUseCase();
const getUsuarioController = new GetUsuarioController(getUsuarioUseCase);

export { getUsuarioUseCase, getUsuarioController };