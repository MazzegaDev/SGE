import PerfilEntity from "../entities/perfilEntity.js";
import PerfilRepository from "../repositories/perfilRepository.js";

export default class PerfilController {
  #repo;
  constructor() {
    this.#repo = new PerfilRepository();
  }
  async cadastrar(req, res) {
    try {
      let { desc } = req.body;
      if (desc) {
        let novoPerfil = new PerfilEntity(0, desc);
        if (await this.#repo.cadastrar(novoPerfil)) {
          return res
            .status(200)
            .json({ msg: "Novo perfil cadastrado com sucesso." });
        } else {
          throw new Error(
            "Nao foi possivel persistir os dados do perfil no banco"
          );
        }
      } else {
        return res
          .status(400)
          .json({ msg: "O perfil possui dados invalidos." });
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
      let lista = await this.#repo.listar();
      if (lista.length > 0) {
        return res.status(200).json(lista);
      } else {
        return res.status(404).json({ msg: "Nao nada para listar." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }

  async atualizar(req, res) {
    // console.log(req.body);
    try {
      let { id, desc } = req.body;
      if (id && desc) {
        if (await this.#repo.procurarID(id)) {
          let perfilAtualizado = new PerfilEntity(id, desc);
          if (await this.#repo.atualizar(perfilAtualizado)) {
            return res.status(200).json({ msg: "Perfil atualizado." });
          } else {
            throw new Error(
              "Nao foi possivel atualizar os dados do usuario no banco"
            );
          }
        } else {
          return res
            .status(404)
            .json({ msg: "O ID informado nao pertece a nenhum perfil" });
        }
      } else {
        return res.status(400).json({ msg: "O perfil nao pode ser" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao." });
    }
  }

  async deletar(req, res) {
    try {
      let { id } = req.params;
      if (await this.#repo.procurarID(id)) {
        if (await this.#repo.deletar(id)) {
          return res.status(200).json({ msg: "Perfil deletado." });
        } else {
          throw new Error(
            "Nao foi possivel deletar os dados do perfil no banco"
          );
        }
      } else {
        return res
          .status(404)
          .json({ msg: "Esse ID nao pertence a nenhum perfil" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }
}
