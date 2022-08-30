import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Options } from '../config/swagger';


export const routes = express();





/**
 * Swagger Roter
 */
const swaggerSpec = swaggerJSDoc(Options);
routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * Error tratament
 */
routes.use((req, res, next) => {
    const error = new Error("Not found");
    next(error)
})
routes.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})
