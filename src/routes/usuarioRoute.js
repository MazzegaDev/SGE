import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const CTRL = new UsuarioController();
const UsuarioRouter = express.Router();
const Auth = new AuthMiddleware();

UsuarioRouter.post("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Usuario']
  // #swagger.summary = 'Cadastra um usuario'

    /*
        #swagger.security = [{
            "bearerAuth": []
        }];
    */


    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/components/schemas/usuario'}
                }
            }
        }
    */
  CTRL.cadastrar(req, res);
});

UsuarioRouter.get("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Usuario']
  // #swagger.summary = 'Lista todos os usuario'

    /*
        #swagger.security = [{
            "bearerAuth": []
        }];
    */

    /*
        #swagger.responses[404] = {
            description: "Nenhum usuario encontrado",
            schema: { $ref: '#/components/schemas/erro'}
        }
    */

  CTRL.listar(req, res);
});

UsuarioRouter.put("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Usuario']
  // #swagger.summary = 'Atualiza um usuario'

  /*
        #swagger.security = [{
            "bearerAuth": []
        }];
    */
  CTRL.atualizar(req, res);
});

UsuarioRouter.delete("/:id", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['Usuario']
  // #swagger.summary = 'Deleta um usuario'

  /*
        #swagger.security = [{
            "bearerAuth": []
        }];
    */
  CTRL.deletar(req, res);
});

export default UsuarioRouter;
