export interface IBeneficiosAcumuladoForCalculeDTO { 
    dib: string, 
    dif: string, 
    beneficio: string, 
    rmi: number 
}

/**
 * @swagger
 * components:
 *   schemas:
 *     BeneficiosAcumuladoForCalcule:
 *       type: object
 *       required:
 *         - dib
 *         - dif
 *         - beneficio
 *         - rmi
 *       properties:
 *         dib:
 *           type: string
 *           description: dib do benefico acumulado
 *         dif:
 *           type: string
 *           description: difdo benefico acumulado
 *         beneficio:
 *           type: string
 *           description: tipo do benefico acumulado
 *         rmi:
 *           type: number
 *           description: rmi do benefico acumulado
 *       example:
 *         dib: '10/10/2018'
 *         dif: '12/09/2021'
 *         beneficio: 'Seguro desemprego'
 *         rmi: 1245
 * */