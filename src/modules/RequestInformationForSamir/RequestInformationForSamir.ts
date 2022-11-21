
import { getUsuarioUseCase } from '../GetUsuario';
import { loginUseCase } from '../LoginUsuario';
import { ILoginDTO } from '../LoginUsuario/LoginDTO';


export class RequestInformationForSamir {

    async execute(data: ILoginDTO): Promise<object> {
        const coockie = await loginUseCase.execute(data);
        return await getUsuarioUseCase.execute(coockie);
    }
}