import express from "express";
import ProfessorController from "../controllers/professorController.js";

const ProfRouter = express.Router();
const CTRL = new ProfessorController();

router.get("/", (req, res) => {
  
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

export default ProfRouter;