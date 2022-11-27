"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsuarioUseCase = void 0;
const requestSapiens_1 = require("../../pytonRequest/requestSapiens");
class GetUsuarioUseCase {
    async execute(cookie) {
        const getTarefa = `{
            "action": "SapiensAdministrativo_Tarefa",
            "method": "getTarefa",
            "data": [
                {
                    "fetch": [
                        "pasta",
                        "pasta.setor",
                        "pasta.setor.unidade",
                        "pasta.processoJudicial",
                        "pasta.comunicacaoOrigem",
                        "comunicacaoJudicial",
                        "especieTarefa",
                        "especieTarefa.generoTarefa",
                        "setorResponsavel",
                        "setorResponsavel.unidade",
                        "usuarioResponsavel",
                        "minutas",
                        "minutas.tipoDocumento",
                        "minutas.tipoDocumento.especieDocumento",
                        "minutas.componentesDigitais",
                        "minutas.componentesDigitais.assinaturas",
                        "minutas.vinculacoesDocumentos",
                        "minutas.vinculacoesDocumentos.documentoVinculado",
                        "minutas.vinculacoesDocumentos.documentoVinculado.tipoDocumento",
                        "minutas.vinculacoesDocumentos.documentoVinculado.componentesDigitais",
                        "minutas.vinculacoesDocumentos.documentoVinculado.componentesDigitais.assinaturas",
                        "criadoPor",
                        "atualizadoPor",
                        "pasta.localizador",
                        "pasta.relevancias",
                        "pasta.lembretes",
                        "pasta.interessados",
                        "pasta.interessados.pessoa",
                        "pasta.assuntos",
                        "pasta.assuntos.assuntoAdministrativo"
                    ],
                    "filter": [
                        {
                            "property": "usuarioResponsavel.id",
                            "value": "eq:380219"
                        },
                        {
                            "property": "dataHoraConclusaoPrazo",
                            "value": "isNull"
                        }
                    ],
                    "page": 1,
                    "start": 0,
                    "limit": 1
                }
            ],
            "type": "rpc",
            "tid": 2
        }`;
        console.log("getTarefaString");
        console.log(getTarefa);
        console.log("getTarefaString");
        const response = (await (0, requestSapiens_1.RequestSapiens)(cookie, getTarefa));
        console.log(response.toString().indexOf("True"));
        return response;
    }
}
exports.GetUsuarioUseCase = GetUsuarioUseCase;
//# sourceMappingURL=GetUsuarioUseCase.js.map