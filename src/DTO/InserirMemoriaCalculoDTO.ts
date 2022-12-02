import { ILoginDTO } from "./LoginDTO";

export interface IInserirMemoriaCalculoDTO {
    login: ILoginDTO;
    etiqueta: string;
    minutas: Array<IMinutasDTO>;
}
export interface IMinutasDTO {
    numeroprocesso: string, 
    conteudo: string
}


/**
 * @swagger
 * components:
 *   schemas:
 *     Minutas:
 *       type: object
 *       required:
 *         - numeroprocesso
 *         - conteudo
 *       properties:
 *         numeroprocesso:
 *           type: string
 *           description: etiqueta do processo
 *         conteudo:
 *           type: string
 *           description: conteudo da minuta (memoria do Calculo)
 *       example:
 *         numeroprocesso: "1000101"
 *         conteudo: "bhhmcasDD"
 * */

/**
 * @swagger
 * components:
 *   schemas:
 *     InserirMemoriaCalculo:
 *       type: object
 *       required:
 *         - login
 *         - minutas
 *         - etiqueta
 *       properties:
 *         login:
 *           type: '#/components/schemas/Login'
 *           description: login sapiens
 *         etiqueta:
 *           type: string
 *           description: etiqueta do processo
 *         minutas:
 *           type: array
 *           description: conteudo da minuta (memoria do Calculo)
 *           example: [{numeroprocesso: "1000101", conteudo: "bhhmcasDD"}]
 *           items: 
 *             type: '#/components/schemas/Minutas'
 *       example:
 *         login: {cpf: "02127337298", senha: Senhasenh4}
 *         etiqueta: LIDO BOOT
 *         minutas: [{numeroprocesso: "1000101", conteudo: "bhhmcasDD"}]
 *         
 * */

