import DataBase from "../db/DataBase.js";
import UsuarioEntity from "../entities/usuarioEntity.js";
import PerfilEntity from "../entities/perfilEntity.js";

export default class UsuarioRepository {
  #Db;
  constructor() {
    this.#Db = new DataBase();
  }

  async cadastrar(novoUser) {
    const sql =
      "insert into TB_Usuarios (usu_nome, usu_senha, usu_email, per_id, usu_ativo) values (?, ?, ?, ? ,?)";
    const values = [
      novoUser.nome,
      novoUser.senha,
      novoUser.email,
      novoUser.perfil.id,
      novoUser.ativo,
    ];

    const result = await this.#Db.ExecutaComandoNonQuery(sql, values);
    return result;
  }

  async listar() {
    const sql = "select * from TB_Usuarios";

    const rows = await this.#Db.ExecutaComando(sql);
    let lista = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      lista.push(this.toMap(row));
    }

    return lista;
  }

  async atualizar(usuarioAtualizado) {
    const sql =
      "update TB_Usuarios set usu_nome = ?, usu_senha = ?, usu_email = ?, per_id = ?, usu_ativo = ? where usu_id = ?";
    const values = [
      usuarioAtualizado.nome,
      usuarioAtualizado.senha,
      usuarioAtualizado.email,
      usuarioAtualizado.perfil.id,
      usuarioAtualizado.ativo,
      usuarioAtualizado.id,
    ];

    const result = await this.#Db.ExecutaComandoNonQuery(sql, values);
    return result;
  }

  async deletar(id) {
    const sql = "delete from TB_Usuarios where usu_id = ?";
    const values = [id];

    const result = await this.#Db.ExecutaComandoNonQuery(sql, values);
    return result;
  }

  async listarPorId(id) {
    const sql = "select * from TB_Usuarios where usu_id = ?";
    const values = [id];
    const rows = await this.#Db.ExecutaComando(sql, values);

    if (rows.length > 0) {
      const row = rows[0];
      let usuario = this.toMap(row);

      return usuario;
    }
    return null;
  }

  async validarAcesso(email, senha) {
    const sql =
      "select * from TB_Usuarios where usu_email = ? and usu_senha = ?";
    const values = [email, senha];

    const rows = await this.#Db.ExecutaComando(sql, values);

    if (rows.length > 0) {
      let row = rows[0];
      let usuario = this.toMap(row);
      return usuario;
    }
    return null;
  }

  async buscarId(id) {
    const sql = "select * from TB_Usuarios where usu_id = ?";
    const values = [id];

    const result = await this.#Db.ExecutaComando(sql, values);

    return result.length > 0;
  }

  async validarUser(id) {
    const sql = "select * from TB_Usuarios where usu_id = ?";
    const values = [id];
    const rows = await this.#Db.ExecutaComando(sql, values);

    if (rows.length > 0) {
      const row = rows[0];
      let usuario = this.toMap(row);

      return usuario;
    }
    return null;
  }

  async verificaIdPerfil(id){
    const sql = "select * from TB_Pefil where per_id = ?";
    const values = [id];

    const rows = await this.#Db.ExecutaComando(sql, values);

    return rows.length > 0;
  }

  toMap(row) {
    let usuario = new UsuarioEntity();
    usuario.id = row["usu_id"];
    usuario.nome = row["usu_nome"];
    usuario.senha = row["usu_senha"];
    usuario.email = row["usu_email"];
    usuario.perfil = new PerfilEntity(row["per_id"]);
    usuario.ativo = row["usu_ativo"];
    return usuario;
  }
}
