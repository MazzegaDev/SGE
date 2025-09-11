import express from "express";
import MateriaController from "../controllers/materiaController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const Auth = new AuthMiddleware();
const MatRouter = express.Router();
const CTRL = new MateriaController();

MatRouter.post("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Materia']
  // #swagger.summary = 'Cadastra uma materia'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.cadastrar(req, res);
});

MatRouter.get("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Materia']
  // #swagger.summary = 'Lista todas as materias'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.listar(req, res);
});

MatRouter.put("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Materia']
  // #swagger.summary = 'Atualiza uma materia'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.alterar(req, res);
});

MatRouter.delete("/:id", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Materia']
  // #swagger.summary = 'Deleta uma materia'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.deletar(req, res);
});

export default MatRouter;
