export interface ILoginDTO {
    cpf: string;
    senha: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - cpf
 *         - senha
 *       properties:
 *         cpf:
 *           type: string
 *           description: CPF do usuario sapiens
 *         senha:
 *           type: string
 *           description: senha Sapiens
 *       example:
 *         cpf: 02127337564
 *         senha: maionese
 * */