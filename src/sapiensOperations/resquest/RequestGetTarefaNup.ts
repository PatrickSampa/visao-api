export class RequestGetTarefaNup {
    async executeMerda(idUsuario: string, nup: string ,processoJudicial?: string, qunatidadeDeProcesso?: number): Promise<string> {
        console.log("ENTROU NESSE")
        let filter = "";
        if(qunatidadeDeProcesso == 0 || qunatidadeDeProcesso == null){
            qunatidadeDeProcesso = 50;
        }

        if(!(processoJudicial == null || processoJudicial == "")){
            processoJudicial = `{"type":"string","value":"${processoJudicial}","field":"pasta.processoJudicial.numero"}`;
        }else{
            processoJudicial = ""
        }


        

        if((!(nup == null || nup == "")) || !(processoJudicial == null || processoJudicial == "")){
            filter =`"gridfilter":[ {"type":"string","value":"${nup}","field":"pasta.NUP"}],`
        }
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
                            "value": "eq:${idUsuario}"
                        },
                        {
                            "property": "dataHoraConclusaoPrazo",
                            "value": "isNull"
                        }
                    ],
                    ${filter}
                    "page": 1,
                    "start": 0,
                    "limit": ${qunatidadeDeProcesso}
                }
            ],
            "type": "rpc",
            "tid": 2
        }`
        return getTarefa;
    }
}