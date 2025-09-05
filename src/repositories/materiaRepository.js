import DataBase from "../db/DataBase.js";
import MateriaEntity from "../entities/materiaEntity.js";

export default class MateriaRepository {
  #Database;
  constructor() {
    this.#Database = new DataBase();
  }

  async listar() {
    const sql = "select * from tb_materias";
    const rows = this.#Database.ExecutaComando(sql);

    let materias = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      materias.push(this.toMap(row));
    }

    return materias;
  }

  async cadastrar(novaMateria) {
    const sql = "insert into tb_materias (mat_nome) values (?)";
    const values = [novaMateria.nome];

    const result = await this.#Database.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async deletar(id) {
    const sql = "delete from tb_materias where mat_id = ?";
    const values = [id];

    const result = await this.#Database.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async alterar(materiaAtualizada) {
    const sql = "update tb_materias set mat_nome = ? where mat_id = ?";
    const values = [materiaAtualizada.nome, materiaAtualizada.id];

    const result = await this.#Database.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async procurarID(id) {
    const sql = "select * from tb_materias where mat_id = ?";
    const values = [id];

    const rows = await this.#Database.ExecutaComando(sql, values);
    
    return rows.length > 0; 
  }

  toMap(row) {
    let materia = new MateriaEntity(row["mat_id"], row["mat_nome"]);

    return materia;
  }
}
