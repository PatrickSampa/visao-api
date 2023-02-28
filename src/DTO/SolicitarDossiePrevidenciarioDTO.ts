export interface SolicitarDossiePrevidenciarioDTO {
    pastaId: number;
    pessoaId: number;
    cookie: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     SolicitarDossiePrevidenciarioDTO:
 *       type: object
 *       required:
 *         - pastaId
 *         - pessoaId
 *         - cookie
 *       properties:
 *         pastaId:
 *           type: number
 *           description: id da pasta a ser solicitado o dossie previdenciario
 *         pessoaId:
 *           type: number
 *           description: id da pessoa a ser solicitado o dossie previdenciario
 *         cookie:
 *          type: string
 *          description: cookie de login    
 *       example:
 *         pastaId: 546899
 *         pessoaId: 0151645
 *         cookie: afefadbuytgveajmvba15567
 * */