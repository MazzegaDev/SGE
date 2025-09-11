import express from "express";
import AuthController from "../controllers/authController.js";

const authRouter = express.Router();
const CTRL = new AuthController();

authRouter.post("/token", (req, res) => {
    // #swagger.tags = ['Autenticacao']
    // #swagger.summary = 'Gera um token de acesso atraves das credenciais de um usuario'
    CTRL.token(req, res);

});

export default authRouter;