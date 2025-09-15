import AuthMiddleware from "../middleware/authMiddleware.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class AuthController {
  #usuRepo;
  constructor() {
    this.#usuRepo = new UsuarioRepository();
  }

  async token(req, res) {
    try {
      let { email, senha } = req.body;
      if (email && senha) {
        let usuario = await this.#usuRepo.validarAcesso(email, senha);
        if (usuario) {
            let auth = new AuthMiddleware();
            let token = auth.gerarToken(usuario.id, usuario.nome, usuario.email, usuario.perfil.id);
            return res.status(200).json({token: token});
        } else {
          return res.status(404).json({ msg: "Nenhum usuario encontrado" });
        }
      } else {
        return res.status(400).json({ msg: "Email e senha invalidos." });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }
}
