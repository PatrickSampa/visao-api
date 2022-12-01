export class RequestCreateDocumento {
    async execute(IDPasta:string,  usuario_nome: string, setorDistribuidor: string, tarefa_id: string, tid: string, tipoDocumento_id: "1344"|string, modelo_id?: string): Promise<string> {
        if(tipoDocumento_id == null || tipoDocumento_id == ""){
            tipoDocumento_id = "1344"
        }
        if(modelo_id == null || modelo_id == ""){
            modelo_id = ""
        }
        const createDocumento = `{
            "action":"SapiensAdministrativo_Documento",
            "method":"createDocumento",
            "data":[
               {
                  "numeroFolhas":1,
                  "dataHoraProducao":"",
                  "localProducao":"",
                  "vinculado":false,
                  "copia":false,
                  "observacao":"",
                  "autor":"${usuario_nome}",
                  "pasta_id":${IDPasta},
                  "redator":"${usuario_nome}",
                  "procedencia_id":"",
                  "tipoDocumento_id":${tipoDocumento_id},
                  "modelo_id":"${modelo_id}",
                  "comunicacaoRemessa_id":"",
                  "setorOrigem_id":${setorDistribuidor},
                  "tarefaOrigem_id":${tarefa_id},
                  "visibilidadeRestrita":false,
                  "semEfeito":false,
                  "localizadorOriginal":"",
                  "minuta":true,
                  "outroNumero":"",
                  "criadoPor_id":"",
                  "origemDados_id":"",
                  "atualizadoPor_id":"",
                  "anexaCopia":"",
                  "descricaoOutros":"",
                  "anexaCopiaVinculados":false,
                  "parentId":null,
                  "leaf":false
               }
            ],
            "type":"rpc",
            "tid":${tid}
         }`

        //console.log(createDocumento)
        
        return createDocumento;
    }
}