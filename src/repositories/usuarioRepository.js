import DataBase from "../db/DataBase.js";
import UsuarioEntity from "../entities/usuarioEntity.js";


export default class UsuarioRepository{
    #Db;
    constructor(){
        this.#Db = new DataBase();
    }

    async validarAcesso(email, senha){
        const sql = "select * from TB_Usuarios where usu_email = ? and usu_senha = ?";
        const values = [email, senha];

        const rows = await this.#Db.ExecutaComando(sql, values);

        if(rows.length > 0){
            let row = rows[0];
            let usuario = this.toMap(row);
            return usuario;
        }
        return null;
       
    }

    async buscarId(id){
        const sql = "select * from TB_Usuarios where usu_id = ?";
        const values = [id];

        const result = await this.#Db.ExecutaComando(sql, values);

        return result.length > 0;
    }

    toMap(row){
        let usuario = new UsuarioEntity();
        usuario.usu_id = row["usu_id"];
        usuario.usu_nome = row["usu_nome"];
        usuario.usu_email = row["usu_email"];
        
        return usuario;
    }

}