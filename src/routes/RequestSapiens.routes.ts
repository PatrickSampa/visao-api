import { Router } from "express";
import { requestInformationForSamirController } from "../modules/RequestInformationForSamir";

//const sessao = request.session();

export const routerAuth = Router();

/**
 * @swagger
 * /teste:
 *   post:
 *     summary: Teste
 *     tags: [Teste]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coockie'
 *                 
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 */


routerAuth.post("/teste", async (req, res) => {
    return requestInformationForSamirController.handle(req, res);
})


