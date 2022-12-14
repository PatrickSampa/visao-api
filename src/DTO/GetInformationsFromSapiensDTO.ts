import { ILoginDTO } from "./LoginDTO";

export interface IGetInformationsFromSapiensDTO {
    login: ILoginDTO;
    etiqueta: string;
}





/**
 * @swagger
 * components:
 *   schemas:
 *     GetInformationsFromSapiens:
 *       type: object
 *       required:
 *         - login
 *         - etiqueta
 *       properties:
 *         login:
 *           type: '#/components/schemas/Login'
 *           description: login sapiens
 *         etiqueta:
 *           type: string
 *           description: etiqueta do processo
 *       example:
 *         login: {cpf: "02127337298", senha: Senhasenh4}
 *         etiqueta: LIDO BOOT
 *         
 * */

