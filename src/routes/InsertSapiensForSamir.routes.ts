import { Router } from "express";
import { insertSapiensMinutasController } from "../modules/InsertSapiensMinutas";

//const sessao = request.session();

export const routerInsertSapiens = Router();

/**
 * @swagger
 * /samir/insertMinutas:
 *   post:
 *     summary: Inser minutas in the sapiens
 *     tags: [InserMinuta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InserirMemoriaCalculo'
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


routerInsertSapiens.post("/insertMinutas", async (req, res) => {
    return insertSapiensMinutasController.handle(req, res);
})


