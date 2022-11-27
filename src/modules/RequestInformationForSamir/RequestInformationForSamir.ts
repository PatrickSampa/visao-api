
import { getUsuarioUseCase } from '../GetUsuario';
import { loginUseCase } from '../LoginUsuario';
import { ILoginDTO } from '../../DTO/LoginDTO';
import { getTarefaUseCase } from '../GetTarefa';


export class RequestInformationForSamir {

    async execute(data: ILoginDTO): Promise<object> {
        const coockie = await loginUseCase.execute(data);
        const usuario = await getUsuarioUseCase.execute(coockie);
        //return usuario[0].id;
        return await getTarefaUseCase.execute(coockie, usuario[0].id);
    }
}