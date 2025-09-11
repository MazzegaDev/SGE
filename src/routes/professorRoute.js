import express from "express";
import ProfessorController from "../controllers/professorController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const Auth = new AuthMiddleware();
const ProfRouter = express.Router();
const CTRL = new ProfessorController();

ProfRouter.post("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Professor']
  // #swagger.summary = 'Cadastra um professor'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.cadastrar(req, res);
});

ProfRouter.get("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Professor']
  // #swagger.summary = 'Lista todos os professores'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.listar(req, res);
});

ProfRouter.put("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Professor']
  // #swagger.summary = 'Atualiza um professor'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.alterar(req, res);
});

ProfRouter.delete("/:id", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Professor']
  // #swagger.summary = 'Deleta um professor'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.deletar(req, res);
});

export default ProfRouter;
