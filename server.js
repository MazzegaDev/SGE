import express from "express";

import TurmaRoute from "./src/routes/turmaRoute.js";
import AlunoRoute from "./src/routes/alunoRoute.js";
import MatRouter from "./src/routes/materiaRoute.js";
import ProfRouter from "./src/routes/professorRoute.js";
import authRouter from "./src/routes/authRouter.js";
import UsuarioRouter from "./src/routes/usuarioRoute.js";
import PerfilRouter from "./src/routes/perfilRoute.js";

import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swaggerOutput.json");

const port = 3000;
const server = express();

server.use(express.json());
server.use(express.static("public"));

//Rotas
server.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
server.use("/aluno", AlunoRoute);
server.use("/turma", TurmaRoute);
server.use("/materia", MatRouter);
server.use("/professor", ProfRouter);
server.use("/usuario", UsuarioRouter);
server.use("/perfil", PerfilRouter);
server.use("/token", authRouter);

server.use(cors());

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
