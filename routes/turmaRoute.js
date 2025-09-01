import TurmaController from "../controllers/turmaController.js";
import express from "express";

const TurmaRoute = express.Router();
const CTRL = new TurmaController();

TurmaRoute.post("/", (req, res) => {

    CTRL.cadastrar(req, res);
});

TurmaRoute.get("/", (req, res) => {

    CTRL.listar(req, res);
})

TurmaRoute.put("/", (req, res) => {

    CTRL.atualizar(req, res);
})

TurmaRoute.delete("/:id", (req, res) => {

    CTRL.deletar(req, res);
})

export default TurmaRoute;