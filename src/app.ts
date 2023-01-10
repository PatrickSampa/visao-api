import express from "express";
import cors from "cors";
import logger from "morgan";
import { routes } from "./routes";

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// app.use(express.json());

/**
 * open access to services
 */
app.use(cors());

/**
 * Permission to receive and send json
 */

/**
 * Configuration of logs
 */
app.use(logger("dev"));

/**
 * The routes of API
 */
 app.use(routes);


/**
 * Connection in DB
 */




export { app } 