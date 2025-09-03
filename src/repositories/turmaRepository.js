import TurmaEntity from "../entities/turmaEntity.js";
import DataBase from "../db/DataBase.js";
export default class TurmaRepository {
  #DataBase;
  constructor() {
    this.#DataBase = new DataBase();
  }

  async cadastrar(novaTurma) {
    const sql = "insert into TB_Turmas (tur_nome, tur_periodo) values (?, ?)";

    const values = [novaTurma.nome, novaTurma.periodo];

    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async listar() {
    const sql = "select * from TB_Turmas";

    const rows = await this.#DataBase.ExecutaComando(sql);

    let turmas = [];

    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      turmas.push(this.toMap(row));
    }

    return turmas;
  }

  async atualizar(turmaAtualizada) {
    const sql =
      "update TB_Turmas set tur_nome = ?, tur_periodo = ? where tur_id = ?";

    const values = [
      turmaAtualizada.nome,
      turmaAtualizada.periodo,
      turmaAtualizada.id,
    ];

    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async deletar(id) {
    const sql = "delete from TB_Turmas where tur_id = ?";

    const values = [id];

    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async procurarID(id) {
    const sql = "select * from TB_Turmas where tur_id = ?";

    const values = [id];

    const rows = await this.#DataBase.ExecutaComando(sql, values);

    if (rows.length > 0) {
      const row = rows[0];
      const turma = this.toMap(row);
      return turma;
    }

    return null;
  }

  async verificarRelacao(id) {
    //Verifica se a turma tem algum aluno antes de deletar <- nao pode deletar turma com aluno
    const sql = "select * from TB_Alunos where tur_id = ?";

    const values = [id];

    const rows = await this.#DataBase.ExecutaComando(sql, values);

    return rows.length > 0;
  }

  toMap(row) {
    let turma = new TurmaEntity(
      row["tur_id"],
      row["tur_nome"],
      row["tur_periodo"]
    );

    return turma;
  }
}
