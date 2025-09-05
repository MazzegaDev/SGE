import DataBase from "../db/DataBase.js";
import ProfessorEntity from "../entities/professorEntity.js";
import MateriaEntity from "../entities/materiaEntity.js";

export default class ProfessorRepository {
  #DataBase;
  constructor() {
    this.#DataBase = new DataBase();
  }

  async listar() {
    const sql = "select * from tb_professores";

    const rows = await this.#DataBase.ExecutaComando(sql);

    let professores = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      professores.push(this.toMap(row));
    }

    return professores;
  }

  async cadastrar(novoProf) {
    const sql =
      "insert into tb_professores (pro_nome, pro_email, mat_id) values (?, ?, ?)";

    const values = [novoProf.nome, novoProf.email, novoProf.materia.id];

    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async alterar(profAtualizado) {
    const sql =
      "update tb_professores set pro_nome = ?, pro_email = ?, mat_id = ? where pro_id = ?";

    const values = [
      profAtualizado.nome,
      profAtualizado.email,
      profAtualizado.materia.id,
      profAtualizado.id,
    ];

    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async deletar(id) {
    const sql = "delete from tb_professores where pro_id = ?";

    const values = [id];

    const result = await this.#DataBase.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async procurarID(id) {
    const sql = "select * from tb_professores where pro_id = ?";
    const values = [id];

    const rows = await this.#DataBase.ExecutaComando(sql, values);

    return rows.length > 0;
  }

  async procurarIdMateria(id){
    const sql = "select * from tb_materias where mat_id = ?";
    const values = [id];

    const rows = await this.#DataBase.ExecutaComando(sql, values);
    return rows.length > 0;
  }

  toMap(row) {
    let prof = new ProfessorEntity(
      row["pro_id"],
      row["pro_nome"],
      row["pro_email"],
      new MateriaEntity(row["mat_id"])
    );
    if (row["mat_nome"]) {
      prof.materia.nome = row["mat_nome"];
    }

    return prof;
  }
}
