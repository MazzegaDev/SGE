import AlunoController from "../controllers/alunoController.js";
import express from "express";

const AlunoRoute = express.Router();
const CTRL = new AlunoController();

AlunoRoute.get("/", (req, res) => {

    CTRL.listar(req,res);
})

AlunoRoute.post("/", (req, res) => {

    CTRL.cadastrar(req,res);
})

AlunoRoute.delete("/:id", (req, res) => {

    CTRL.deletar(req, res);
})

AlunoRoute.put("/", (req, res) => {

    CTRL.atualizar(req,res);
})

export default AlunoRoute;