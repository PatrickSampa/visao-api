export class RequestGetPasta {
    async execute(nup: string): Promise<string> {
        const getTarefa = `{
            "action":"SapiensAdministrativo_Pasta",
            "method":"getPasta",
            "data":[
               {
                  "fetch":[
                     
                  ],
                  "limit":10,
                  "query":" ${nup} ",
                  "page":1,
                  "start":0
               }
            ],
            "type":"rpc",
            "tid":3
         }`
        
        return getTarefa;
    }
}