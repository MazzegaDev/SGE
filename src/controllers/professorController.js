import ProfessorRepository from "../repositories/professorRepository.js";
import ProfessorEntity from "../entities/professorEntity.js";
import MateriaEntity from "../entities/materiaEntity.js";

export default class ProfessorController {
  #ProRepo;
  constructor() {
    this.#ProRepo = new ProfessorRepository();
  }

  async listar(req, res) {
    try {
      let lista = await this.#ProRepo.listar();
      if (lista.length > 0) {
        return res.status(200).json(lista);
      } else {
        return res.status(404).json({ msg: "Nenhum professor para exibir" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }

  async cadastrar(req, res) {
    try {
      let { nome, email, materia } = req.body;
      if (nome && email && materia && materia.id) {
        let novoProf = new ProfessorEntity(
          0,
          nome,
          email,
          new MateriaEntity(materia.id)
        );
        if (await this.#ProRepo.procurarIdMateria(materia.id)) {
          if (await this.#ProRepo.cadastrar(novoProf)) {
            return res.status(200).json({ msg: "O professor foi cadastrado." });
          } else {
            throw new Error(
              "Nao foi possivel persistir os dados do professor no banco de dados"
            );
          }
        } else {
          return res.status(400).json({
            msg: "O ID da materia informado nao pertence a nenhuma materia",
          });
        }
      } else {
        return res.status(400).json({
          msg: "O professor nao pode conter dados invalidos. Verificar nome, email ou id da materia lecionada por ele.",
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }

  async alterar(req, res) {
    try {
      let { id, nome, email, materia } = req.body;
      if (id && nome && email && materia && materia.id) {
        let profAtualizado = new ProfessorEntity(
          id,
          nome,
          email,
          new MateriaEntity(materia.id)
        );
        if (await this.#ProRepo.procurarID(id)) {
          if (await this.#ProRepo.procurarIdMateria(materia.id)) {
            if (await this.#ProRepo.alterar(profAtualizado)) {
            } else {
              throw new Error(
                "Nao foi possivel alterar os dados do professor no banco"
              );
            }
          } else {
            return res.status(400).json({
              msg: "O id da materia do professor nao pode ser atualizado com um id que nao referencie uma materia existente",
            });
          }
        } else {
          return res
            .status(404)
            .json({ msg: "O id informado nao pertence a nenhum professor." });
        }
      } else {
        return res.status(400).json({
          msg: "O professor nao pode ser alterado com dados invalidos.",
        });
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
      if (await this.#ProRepo.procurarID(id)) {
        if (await this.#ProRepo.deletar(id)) {
          return res.status(200).json({ msg: "O professor foi deletado." });
        } else {
          throw new Error(
            "Nao foi possivel deletar os dados do professor no banco."
          );
        }
      } else {
        return res
          .status(404)
          .json({ msg: "O ID informado nao pertence a nenhum professor." });
      }
    } catch (error) {}
  }
}
