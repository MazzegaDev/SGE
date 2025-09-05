import TurmaRepository from "../repositories/turmaRepository.js";
import ProfessorEntity from "../entities/professorEntity.js";
import TurmaEntity from "../entities/turmaEntity.js";

export default class TurmaController {
  #TurmaRepo;
  constructor() {
    this.#TurmaRepo = new TurmaRepository();
  }

  async cadastrar(req, res) {
    try {
      let { nome, periodo, professor } = req.body;
      if (nome && periodo && professor && professor.id) {
        let novaTurma = new TurmaEntity(0, nome, periodo, new ProfessorEntity(professor.id));
        let inseriu = await this.#TurmaRepo.cadastrar(novaTurma);
        if (inseriu == true) {
          return res.status(200).json({ msg: "Nova turma criada." });
        } else {
          throw new Error(
            "Nao foi possivel persistir os dados da turma no banco de dados."
          );
        }
      } else {
        return res.status(400).json({
          msg: "A turma nao pode conter dados invalidos, checar nome ou periodo!",
        });
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
      let lista = await this.#TurmaRepo.listar();
      if (lista.length > 0) {
        return res.status(200).json(lista);
      } else {
        return res
          .status(404)
          .json({ msg: "Nao ha nenhuma turma para exibir" });
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
      let { id, nome, periodo, professor } = req.body;
      if (id && nome && periodo && professor && professor.id) {
        if (await this.#TurmaRepo.procurarID(id)) {
          let turmaAtualizada = new TurmaEntity(id, nome, periodo, new ProfessorEntity(professor.id));
          if (await this.#TurmaRepo.atualizar(turmaAtualizada)) {
            return res
              .status(200)
              .json({ msg: "Os dados da turma foi atualizado" });
          } else {
            throw new Error(
              "Nao foi possivel atualizar os dados da turma no banco"
            );
          }
        } else {
          return res
            .status(404)
            .json({ msg: "O ID informado nao pertence a nenhuma turma." });
        }
      } else {
        return res.status(400).json({
          msg: "A turma nao pode ser atualizada com dados invalidos!",
        });
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
      if (await this.#TurmaRepo.procurarID(id)) {
        let temAluno = await this.#TurmaRepo.verificarRelacao(id);
        if (!temAluno) {
          if (await this.#TurmaRepo.deletar(id)) {
            return res.status(200).json({ msg: "A turma foi deletada." });
          } else {
            throw new Error(
              "Nao foi possivel deletar os dados da turma no banco."
            );
          }
        } else {
          return res.status(400).json({
            msg: "Essa turma nao pode ser deletada pois tem alunos atrelados a ela.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ msg: "O id informado nao pertence a nenhuma turma." });
      }
    } catch (error) {}
  }
}
