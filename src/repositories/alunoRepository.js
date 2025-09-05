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

    return rows.length > 0;
  }

  async cadastrar(novoAluno) {
    const sql =
      "insert into TB_Alunos (alu_nome, alu_email, alu_idade, tur_id) values (?, ?, ?, ?)";
    const values = [
      novoAluno.nome,
      novoAluno.email,
      novoAluno.idade,
      novoAluno.turma.id,
    ];
    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async listar() {
    const sql = "select * from TB_Alunos";
    const rows = await this.#DataBase.ExecutaComando(sql);
    let alunos = [];

    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];

      alunos.push(this.toMap(row));
    }

    return alunos;
  }

  async atualizar(alunoAtualizado) {
    const sql =
      "update TB_Alunos set alu_nome = ?, alu_email = ?, alu_idade = ?, tur_id = ? where alu_id = ?";
    const values = [
      alunoAtualizado.nome,
      alunoAtualizado.email,
      alunoAtualizado.idade,
      alunoAtualizado.turma.id,
      alunoAtualizado.id,
    ];

    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async deletar(id) {
    const sql = "delete from TB_Alunos where alu_id = ?";
    const values = [id];

    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async verificaTurma(turId){
    const sql = "select * from tb_turmas where tur_id = ?";
    const values = [turId];

    const rows = await this.#DataBase.ExecutaComando(sql, values);

    return rows.length > 0;
  }

  toMap(row) {
    let aluno = new AlunoEntity(
      row["alu_id"],
      row["alu_nome"],
      row["alu_email"],
      row["alu_idade"],
      new TurmaEntity(row["tur_id"])
    );
    if (row["tur_nome"]) {
      aluno.turma.nome = row["tur_nome"];
    }

    return aluno;
  }
}



