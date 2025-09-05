import express from "express";
import MateriaController from "../controllers/materiaController.js";

const MatRouter = express.Router();
const CTRL = new MateriaController();

router.get("/", (req, res) =>{

    CTRL.listar(req, res);
});

router.post("/", (req, res) => {

    CTRL.cadastrar(req, res);
});

router.put("/", (req, res) => {

    CTRL.alterar(req, res);
});

router.delete("/:id", (req, res) => {

    CTRL.deletar(req, res);
});

export default MatRouter;