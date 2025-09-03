import AlunoEntity from "../entities/alunoEntity.js";
import AlunoRepository from "../repositories/alunoRepository.js";
import TurmaEntity from "../entities/turmaEntity.js";

export default class AlunoController {
  #AlunoRepo;
  constructor() {
    this.#AlunoRepo = new AlunoRepository();
  }

  async listar(req, res) {
    try {
      let lista = await this.#AlunoRepo.listar();
      if (lista.length > 0) {
        return res.status(200).json(lista);
      } else {
        return res.status(404).json({ msg: "Nenhum aluno para exibir" });
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
      let { nome, email, idade, turma } = req.body;
      if (nome && email && idade && turma && turma.id) {
        let novoAluno = new AlunoEntity(
          0,
          nome,
          email,
          idade,
          new TurmaEntity(turma.id)
        );
        let inseriu = await this.#AlunoRepo.cadastrar(novoAluno);
        if (inseriu == true) {
          return res.status(200).json({ msg: "Novo aluno inserido!" });
        } else {
          throw new Error("Nao foi possivel persistir os dados no banco.");
        }
      } else {
        return res.status(400).json({
          msg: "O aluno nao pode conter dados invalidos. Verificar nome, email, idade ou id da turma referente!",
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
      if (await this.#AlunoRepo.procurarID(id)) {
        if (await this.#AlunoRepo.deletar(id)) {
          return res.status(200).json({ msg: "O aluno foi deletado" });
        } else {
          throw new Error(
            "Nao foi possivel deletar os dados do aluno no banco."
          );
        }
      } else {
        return res
          .status(404)
          .json({ msg: "O ID informadao nao pertence a nenhum aluno." });
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
      let { id, nome, email, idade, turma } = req.body;

      if (id && nome && email && idade && turma && turma.id) {
        if (await this.#AlunoRepo.procurarID(id)) {
          let alunoAtualizado = new AlunoEntity(
            id,
            nome,
            email,
            idade,
            new TurmaEntity(turma.id)
          );

          if (await this.#AlunoRepo.atualizar(alunoAtualizado)) {
            return res
              .status(200)
              .json({ msg: "Os dados do aluno foram atualizados" });
          } else {
            throw new Error(
              "Nao foi possivel alterar os dados do aluno no banco"
            );
          }
        } else {
          return res
            .status(404)
            .json({ msg: "O ID informado nao pertence a nenhum aluno." });
        }
      } else {
        return res.status(400).json({
          msg: "O aluno nao pode ser atualizado com dados invalidos!.",
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }
}
