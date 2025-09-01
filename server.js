import express from "express";
import TurmaRoute from "./routes/turmaRoute.js";
import AlunoRoute from "./routes/alunoRoute.js";

const port = 3000;
const server = express();

server.use(express.json());

server.use("/", AlunoRoute);
server.use("/turma", TurmaRoute);



server.listen(port, ()=> {
    console.log(`http://localhost:${port}`);
})