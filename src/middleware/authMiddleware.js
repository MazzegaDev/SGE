import jwt from "jsonwebtoken";
const secret = "m5a5z4g3wppr";
import usuarioRepository from "../repositories/usuarioRepository.js";

export default class AuthMiddleware {
  gerarToken(id, nome, email, perfil) {
    let jwtObj = jwt.sign(
      {
        //Payload = Dados do usuario
        id: id,
        nome: nome,
        email: email,
        perfil: perfil,
      },
      //secret key
      secret,
      {
        //Opcoes
        expiresIn: 300000,
      }
    );

    return jwtObj;
  }

  async autenticarToken(req, res, next) {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      try {
        let payload = jwt.verify(token, secret); // <- se nosso token for valido, o jwt.verify vai decodificar o corpo e rotornar as infos do usuarios (payload)
        let usuarioRepo = new usuarioRepository();

        // console.log(payload);

        let usuario = await usuarioRepo.validarUser(payload.id);
        if (usuario) {
          if (usuario.ativo) {
            next();
          } else {
            return res.status(401).json({ msg: "Usuario inativo" });
          }
        } else {
          return res.status(404).json({ msg: "Esse usuario nao existe." });
        }
      } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: "Token invalido" });
      }
    } else {
      return res.status(404).json({ msg: "Token nao encontrado" });
    }
  }
}
