
import { RequestGetTarefa } from '../../sapiensOperations/resquest/RequestGetTarefa';
import { RequestGetTarefaNup } from '../../sapiensOperations/resquest/RequestGetTarefaNup';
import { GetTarefaNupController } from './GetTarefaNupController';
import { GetTarefaNupUseCase } from './GetTarefaNupUseCase';

const requestGetTarefaNup = new RequestGetTarefaNup();
const getTarefaUseCaseNup = new GetTarefaNupUseCase(requestGetTarefaNup);
const getTarefaNupController = new GetTarefaNupController(getTarefaUseCaseNup);

export { getTarefaUseCaseNup, getTarefaNupController };