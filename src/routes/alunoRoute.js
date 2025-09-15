import AlunoController from "../controllers/alunoController.js";
import express from "express";
import AuthMiddleware from "../middleware/authMiddleware.js";

const Auth = new AuthMiddleware();
const AlunoRoute = express.Router();
const CTRL = new AlunoController();

AlunoRoute.post("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['aluno']
  // #swagger.summary = 'Cadastra um aluno'

  /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/components/schemas/aluno' }
                } 
            }
        }
  */

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */

  CTRL.cadastrar(req, res);
});

AlunoRoute.get("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['aluno']
  // #swagger.summary = 'Lista todos os alunos'

  /*
        #swagger.responses[404] = {
            description: "Nenhum aluno encontrado",
            schema: { $ref: '#/components/schemas/erro' }
        }
  */

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.listar(req, res);
});

AlunoRoute.get("/:id", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['aluno']
  // #swagger.summary = 'lista quantos alunos tem em uma turma'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.contarPorTurma(req, res);
});

AlunoRoute.put("/", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['aluno']
  // #swagger.summary = 'Atualiza um aluno'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.atualizar(req, res);
});

AlunoRoute.delete("/:id", Auth.autenticarToken, (req, res) => {
  // #swagger.tags = ['aluno']
  // #swagger.summary = 'Deleta um aluno'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  CTRL.deletar(req, res);
});

export default AlunoRoute;
