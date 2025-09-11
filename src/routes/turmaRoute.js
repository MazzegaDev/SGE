import TurmaController from "../controllers/turmaController.js";
import express from "express";
import AuthMiddleware from "../middleware/authMiddleware.js";

const Auth = new AuthMiddleware();
const TurmaRoute = express.Router();
const CTRL = new TurmaController();

TurmaRoute.post("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Turma']
  // #swagger.summary = 'Cadastra uma turma'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.cadastrar(req, res);
});

TurmaRoute.get("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Turma']
  // #swagger.summary = 'Lista todas as turma'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.listar(req, res);
});

TurmaRoute.put("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Turma']
  // #swagger.summary = 'Atualiza uma turma'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.atualizar(req, res);
});

TurmaRoute.delete("/:id", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Turma']
  // #swagger.summary = 'Deleta um turma'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.deletar(req, res);
});

export default TurmaRoute;
