export interface IGetTarefaDTO {
    idUsuario: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     GetTarefa:
 *       type: object
 *       required:
 *         - idUsuario
 *       properties:
 *         idUsuario:
 *           type: string
 *           description: idUsuario do usuario sapiens
 *       example:
 *         idUsuario: 3802191
 * */