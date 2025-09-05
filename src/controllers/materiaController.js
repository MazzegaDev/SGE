import MateriaRepository from "../repositories/materiaRepository.js";
import MateriaEntity from "../entities/materiaEntity.js";

export default class MateriaController {
  #MateriaRepo;
  constructor() {
    this.#MateriaRepo = new MateriaRepository();
  }

  async listar(req, res) {
    try {
      let lista = await this.#MateriaRepo.listar();
      if (lista.length > 0) {
        return res.status(200).json(lista);
      } else {
        return res.status(404).json({ msg: "Nenhuma materia para listar" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao." });
    }
  }

  async cadastrar(req, res) {
    try {
      let { nome } = req.body;
      if (nome) {
        let novaMateria = new MateriaEntity(0, nome);
        if (await this.#MateriaRepo.cadastrar(novaMateria)) {
          return res.status(200).json({ msg: "Nova materia cadastrada." });
        } else {
          throw new Error("Nao foi possivel persistir os dados no banco.");
        }
      } else {
        return res
          .status(400)
          .json({ msg: "A materia nao pode conter dados invalidos." });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao." });
    }
  }

  async alterar(req, res) {
    try {
      let { id, nome } = req.body;
      if (id && nome) {
        if (await this.#MateriaRepo.procurarID(id)) {
          let materiaAtualizada = new MateriaEntity(id, nome);
          if (await this.#MateriaRepo.alterar(materiaAtualizada)) {
            return res
              .status(200)
              .json({ msg: "Os dados da materia foram atualizados" });
          } else {
            throw new Error(
              "Nao foi possivel alterar os dados da materia no banco"
            );
          }
        } else {
          return res
            .status(404)
            .json({ msg: "O id informado nao pertence a nenhuma materia" });
        }
      } else {
        return res.status(404).json({
          msg: "A materia nao pode ser atualizada com dados invalidos.",
        });
      }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Nao foi possivel processar a requisicao"})
    }
  }

  async deletar(req, res) {
    try {
      let { id } = req.params;
      if (await this.#MateriaRepo.procurarID(id)) {
        if(await this.#MateriaRepo.deletar(id)){
            return res.status(200).json({msg: "A materia foi deletada"})
        }else{
            throw new Error("Nao foi possivel deletar a materia no banco")
        }
      } else {
        return res
          .status(404)
          .json({ msg: "O id informado nao pertence a nenhuma materia." });
      }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Nao foi possivel processar a requisicao"})
    }
  }
}