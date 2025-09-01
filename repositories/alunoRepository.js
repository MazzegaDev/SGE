import DataBase from "../db/DataBase.js";
import AlunoEntity from "../entities/alunoEntity.js";
import TurmaEntity from "../entities/turmaEntity.js";

export default class AlunoRepository {
  #DataBase;
  constructor() {
    this.#DataBase = new DataBase();
  }

  async procurarID(id) {
    const sql = "select * from TB_Alunos where alu_id = ?";
    const values = [id];
    const rows = await this.#DataBase.ExecutaComando(sql, values);

    if (rows.length > 0) {
      const row = rows[0];
      const aluno = new AlunoEntity(
        row["alu_id"],
        row["alu_nome"],
        row["alu_email"],
        row["alu_idade"],
        new TurmaEntity(row["tur_id"])
      );

      return aluno;
    }

    return null;
  }

  async cadastrar(novoAluno) {
    const sql =
      "insert into TB_Alunos (alu_nome, alu_email, alu_idade, tur_id) values (?, ?, ?, ?)";
    const values = [novoAluno.nome, novoAluno.email, novoAluno.idade, novoAluno.turma.id];
    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async listar() {
    const sql = "select * from TB_Alunos";
    const rows = await this.#DataBase.ExecutaComando(sql);
    let alunos = [];

    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];

      alunos.push(
        new AlunoEntity(
          row["alu_id"],
          row["alu_nome"],
          row["alu_email"],
          row["alu_idade"],
          new TurmaEntity(row["tur_id"])
        )
      );
    }

    return alunos;
  }

  async atualizar(alunoAtualizado){
    const sql = "update TB_Alunos set alu_nome = ?, alu_email = ?, alu_idade = ?, tur_id = ? where alu_id = ?";
    const values = [alunoAtualizado.nome, alunoAtualizado.email, alunoAtualizado.idade, alunoAtualizado.turma.id, alunoAtualizado.id];

    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async deletar(id){
    const sql = "delete from TB_Alunos where alu_id = ?";
    const values = [id];

    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }
}
