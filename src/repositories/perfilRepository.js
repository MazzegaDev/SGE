import PerfilEntity from "../entities/perfilEntity.js";
import DataBase from "../db/DataBase.js";

export default class PerfilRepository{
    #db;
    constructor(){
        this.#db = new DataBase();
    }

    async cadastrar(novoPerfil){
        const sql = "insert into TB_Perfil (per_desc) values (?)";
        const values = [novoPerfil.desc];

        const result = await this.#db.ExecutaComando(sql, values);

        return result;
    }

    async listar(){
        const sql = "select * from TB_Perfil";
        const rows = await this.#db.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(
                this.toMap(row)
            );
        }

        return lista;
    }

    async atualizar(perfilAtualizado){
        const sql = "update TB_Perfil set per_desc = ? where per_id = ?";
        const values = [perfilAtualizado.desc, perfilAtualizado.id];

        const result = await this.#db.ExecutaComandoNonQuery(sql, values);

        return result;
    }

    async deletar(id){
        const sql = "delete from TB_Perfil where per_id = ?";
        const values = [id];

        const result = await this.#db.ExecutaComandoNonQuery(sql, values);

        return result;
    }

    async procurarID(id){
        const sql = "select * from TB_Perfil where per_id = ?";
        const values = [id];

        const rows = await this.#db.ExecutaComando(sql, values);

        return rows.length > 0;

    }

    toMap(row){
        let perfil = new PerfilEntity(
            row["per_id"],
            row["per_desc"]
        );
        return perfil;
    }
}
