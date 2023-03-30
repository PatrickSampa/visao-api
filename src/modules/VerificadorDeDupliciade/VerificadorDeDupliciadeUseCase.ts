import { IGetInformationsFromSapiensDTO } from "../../DTO/GetInformationsFromSapiensDTO";
import { processoEhAdministrativo } from "../AtualizacaoDossiePrevidenciario/helps/processoEhAdministrativo";
import { getTarefaUseCase } from "../GetTarefa";
import { getUsuarioUseCase } from "../GetUsuario";
import { loginUseCase } from "../LoginUsuario";
import { updateEtiquetaUseCase } from "../UpdateEtiqueta";
import { buscadorDeCNJDoPassivo } from "./helps/buscadorDeCNJDoPassivo";

export class VerificadorDeDupliciadeUseCase {

    async execute(data: IGetInformationsFromSapiensDTO): Promise<Array<string>> {
        return new Promise(async (resolve, reject) => {
            var arrayDeCNJ = []
            const cookie = await loginUseCase.execute(data.login);
            const usuario = (await getUsuarioUseCase.execute(cookie));

            const usuario_id = `${usuario[0].id}`;

            let response: Array<any> = [];
            data.etiqueta = await data.etiqueta.toUpperCase()
            const etiquetaInvalida = data.etiqueta.includes("PROCESSO") || data.etiqueta.includes("DUPLICADO")

            if (etiquetaInvalida) {
                console.log(etiquetaInvalida)
                reject(new Error("etiqueta não pode ter as palavras falha e/ou atualizaçao"))
            }
            console.log("data.etiqueta", data.etiqueta, "usuario_id", usuario_id);
            const qunatidadeDeProcesso = 50;
            var tarefas: any[]
            do {
                tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta, qunatidadeDeProcesso })
                for (const tarefa of tarefas) {

                    const tarefaId = tarefa.id;
                    try {
                        var cnj: string;
                        if (await processoEhAdministrativo(tarefa, cookie)) {
                            cnj = await buscadorDeCNJDoPassivo(tarefa.pasta.NUP, cookie);
                        } else {
                            cnj = tarefa.pasta.id;
                        }
                        const processoDuplicado = arrayDeCNJ.find(objeCNJ => objeCNJ === cnj) != undefined
                        if(processoDuplicado){
                            console.log("PROCESSO DUPLICADO")
                            response.push(cnj)
                            await updateEtiquetaUseCase.execute({ cookie, etiqueta: "PROCESSO DUPLICADO", tarefaId });
                        }else{
                            await updateEtiquetaUseCase.execute({ cookie, etiqueta: "PROCESSO NORMAL", tarefaId });
                            console.log("PROCESSO NORMAL")
                            arrayDeCNJ.push(cnj);
                        }
                    } catch (error) {
                        console.log("ERRO no processo de VERIFICAR DUPLICIDDADE")
                        console.log(error)
                        await updateEtiquetaUseCase.execute({ cookie, etiqueta: "FALHA AO VERIFICAR DUPLICIDDADE", tarefaId });
                    }

                }
            } while (tarefas.length >= qunatidadeDeProcesso);

            resolve(await response)
        })

    }
}