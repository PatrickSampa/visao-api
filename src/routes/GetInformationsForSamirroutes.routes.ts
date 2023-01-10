import { Router } from "express";
import { getInformationFromSapienForSamirController } from "../modules/GetInformationFromSapienForSamir";

//const sessao = request.session();

export const routerGetInformationsForSamir = Router();

/**
 * @swagger
 * /samir/getInformationFromSapienForSamir:
 *   post:
 *     summary: get Information From Sapien For Samir
 *     tags: [GetInformationFromSapien]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetInformationsFromSapiens'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformationsForCalcule'
 *                 
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 */


routerGetInformationsForSamir.post("/getInformationFromSapienForSamir", async (req, res) => {
    return getInformationFromSapienForSamirController.handle(req, res);
})