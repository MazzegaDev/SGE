import UsuarioRepository from "../repositories/usuarioRepository.js";
import UsuarioEntity from "../entities/usuarioEntity.js";
import PerfilEntity from "../entities/perfilEntity.js";

export default class UsuarioController {
  #UsuRepo;
  constructor() {
    this.#UsuRepo = new UsuarioRepository();
  }

  async cadastrar(req, res) {
    try {
      console.log(req.body);
      let { nome, email, senha, ativo, perfil } = req.body;
      if (nome && email && senha && perfil && perfil.id) {
        if (await this.#UsuRepo.verificaIdPerfil(perfil.id)) {
          let novoUser = new UsuarioEntity(
            0,
            nome,
            senha,
            email,
            new PerfilEntity(perfil.id),
            ativo
          );
          if (await this.#UsuRepo.cadastrar(novoUser)) {
            return res.status(200).json({ msg: "Usuario cadastrado" });
          } else {
            throw new Error("Nao foi possivel persistir os dados no banco");
          }
        } else {
          return res
            .status(404)
            .json({ msg: "O ID de perfil nao pertence a nenhum perfil." });
        }
      } else {
        return res
          .status(400)
          .json({ msg: "O usuario possui dados invalidos" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }

  async listar(req, res) {
    try {
      let lista = await this.#UsuRepo.listar();
      if (lista.length > 0) {
        return res.status(200).json(lista);
      } else {
        return res.status(404).json({ msg: "Nenhum usuario para listar" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }

  async atualizar(req, res) {
    try {
      let { id, nome, email, senha, ativo, perfil } = req.body;
      if (id && nome && email && senha && perfil && perfil.id) {
        if (await this.#UsuRepo.buscarId(id)) {
          let usuarioAtualizado = new UsuarioEntity(
            id,
            nome,
            senha,
            email,
            new PerfilEntity(perfil.id),
            ativo
          );
          if (await this.#UsuRepo.atualizar(usuarioAtualizado)) {
            return res.status(200).json({ msg: "Usuario atualizado" });
          } else {
            throw new Error(
              "Nao foi possivel atualizar os dados do usuario no banco"
            );
          }
        } else {
          return res
            .status(404)
            .json({ msg: "Nao existe nenhum usuario com esse ID" });
        }
      } else {
        return res.status(400).json({ msg: "Os novos dados estao invalidos" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }

  async deletar(req, res) {
    try {
      let { id } = req.params;
      if (await this.#UsuRepo.buscarId(id)) {
        if (await this.#UsuRepo.deletar(id)) {
          return res.status(200).json({ msg: "Usuario deletado." });
        } else {
          throw new Error(
            "Nao foi possivel deletar os dados do usuario no banco"
          );
        }
      } else {
        return res
          .status(404)
          .json({ msg: "Esse ID nao pertence a nenhum usuario" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }

  async listarPorId(req, res) {
    try {
      let { id } = req.params;
      if (await this.#UsuRepo.buscarId(id)) {
        let lista = await this.#UsuRepo.listarPorId(id);
        if (lista) {
          return res.status(200).json(lista);
        } else {
          return res.status(404).json({ msg: "Nada para listar" });
        }
      } else {
        return res
          .status(404)
          .json({ msg: "Esse ID nao pertence a nenhum usuario" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel procesasar a requisicao" });
    }
  }
}
