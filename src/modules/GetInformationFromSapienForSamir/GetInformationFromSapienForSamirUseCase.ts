
import { getUsuarioUseCase } from '../GetUsuario';
import { loginUseCase } from '../LoginUsuario';
import { getTarefaUseCase } from '../GetTarefa';
import { IGetInformationsFromSapiensDTO } from '../../DTO/GetInformationsFromSapiensDTO';
import { IGetArvoreDocumentoDTO } from '../../DTO/GetArvoreDocumentoDTO';
import { getArvoreDocumentoUseCase } from '../GetArvoreDocumento/index';


export class GetInformationFromSapienForSamirUseCase {

    async execute(data: IGetInformationsFromSapiensDTO): Promise<any> {
        const cookie = await loginUseCase.execute(data.login);
        const usuario = (await getUsuarioUseCase.execute(cookie));

        const usuario_id = `${usuario[0].id}`;
        // const usuario_setor = `${usuario[0].colaborador.lotacoes[0].setor.id}`;
        const usuario_nome = `${usuario[0].nome}`;
        var tidNumber = 3;
        let response: Array<any> = [];
        //console.log("data.etiqueta", data.etiqueta, "usuario_id", usuario_id);
        const tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta})
        //console.log(JSON.stringify(tarefas[0]));
        //const numero_processoJudicial = tarefas[0].pasta.processoJudicial.numero;
        //console.log(tarefas[0].pasta.processoJudicial.numero);

        for (var i = 0; i < tarefas.length; i++) {
            // console.log(tarefas[i].pasta.interessados[0]);
            // console.log(tarefas[i].pasta.interessados.length);
            var processo: string;
            // console.log(processo, tarefas.length);
            // const tarefa_id = `${tarefas[i].id}`;
            // const pasta_id = `${tarefas[i].pasta.id}`;
            // const usuario_setor = `${tarefas[i].setorResponsavel_id}`
            // const tid = `${tidNumber}`;
            // tarefas[i].postIt = "MEMÓRIA DE CALCULO INSERIDA NA MINUTA";
            // tarefas[i].tid = tidNumber;
            // console.log(JSON.stringify(tarefas[i]));
            // const updateTarefa = await updateTarefaUseCase.execute(cookie, (tarefas[i]));
            // response.push(updateTarefa[0]);
            const objectGetArvoreDocumento: IGetArvoreDocumentoDTO = {nup:  tarefas[i].pasta.NUP, chave: tarefas[i].pasta.chaveAcesso,  cookie, tarefa_id: tarefas[i].id}
            // console.log(tarefa);

            const result = await getArvoreDocumentoUseCase.execute(objectGetArvoreDocumento);
            console.log(result);
            response.push( tarefas[i]);

            if (i == tarefas.length - 1) {
                return response
            }
            tidNumber ++;
        }

        // const usuario_setor = `41430`;
        // const usuario_nome = `MOISES ALEXANDRE POMPILHO DA COSTA`;
        // const tarefa_id = `135835019`;
        // const pasta_id = `18348345`;
        // const tid = `${tidNumber}`;
        // const createDocument = await createDocumentoUseCase.execute({ cookie, usuario_nome, usuario_setor, tarefa_id, pasta_id, tid }); 
        // return createDocument[0];
        //const conteudo = new TesteDeHTML()

        //console.log("setor", usuario_setor, "nome", usuario_nome)


        //return usuario[0].id;
        // return uploadDocumentUseCase.execute(coockie, "testeDeHTML.html", await conteudo.execute());

    }
}