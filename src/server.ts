import { app } from "./app";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

app.get('/', (req, res) => res.send('Hello World 100!'))

app.listen(PORT);