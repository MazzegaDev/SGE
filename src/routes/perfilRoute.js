import express from "express";
import PerfilController from "../controllers/perfilController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const Auth = new AuthMiddleware();
const PerfilRouter = express.Router();
const CTRL = new PerfilController();

PerfilRouter.post("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Perfil']
  // #swagger.summary = 'Cadastra um perfil'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */

  /*
      #swagger.requestBody = {
          required: true,
          content: {
              "application/json":{
                schema: { $ref: '#/components/schemas/perfil' }
              }
          }
      }
  */
  CTRL.cadastrar(req, res);
});

PerfilRouter.get("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Perfil']
  // #swagger.summary = 'Lista os todos os perfils'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */

  /*
    #swagger.resposnes[404] = {
      description: "Nenhum perfil encontrado",
      schema: { $ref: '#/components/schemas/erro' }
    }
  */
  CTRL.listar(req, res);
});

PerfilRouter.put("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Perfil']
  // #swagger.summary = 'Atualiza um perfil'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.atualizar(req, res);
});

PerfilRouter.delete("/:id", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Perfil']
  // #swagger.summary = 'Deleta um perfil'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.deletar(req, res);
});

export default PerfilRouter;
