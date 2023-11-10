import { app } from "./app";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.API_PORT;

app.get('/', (req, res) => {
    console.log("sadasdsa " + res)
    res.send('Hello World 100!')
})

app.listen(PORT, () => console.log("Visao runing in PORT " + PORT));