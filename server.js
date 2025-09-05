import express from "express";
import TurmaRoute from "./src/routes/turmaRoute.js";
import AlunoRoute from "./src/routes/alunoRoute.js";
import MatRouter from "./src/routes/materiaRoute.js";
import ProfRouter from "./src/routes/professorRoute.js";
import cors from "cors"

const port = 3000;
const server = express();

server.use(express.json());
server.use(express.static("public"));

//Rotas
server.use("/aluno", AlunoRoute);
server.use("/turma", TurmaRoute);
server.use("/materia", MatRouter);
server.use("/professor", ProfRouter);

server.use(cors());

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
  