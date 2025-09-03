import mysql from "mysql2";

export default class DataBase {
  #conexao;

  get conexao() {
    return this.#conexao;
  }

  set conexao(conexao) {
    this.#conexao = conexao;
  }

  constructor() {
    this.#conexao = mysql.createPool({
      host: "127.0.0.1",
      database: "sge",
      user: "root",
    });
  }

  ExecutaComando(sql, valor) {
    var cnn = this.#conexao;
    return new Promise((resolve, reject) => {
      cnn.query(sql, valor, function (error, result, field) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  ExecutaComandoNonQuery(sql, valor){
    var cnn = this.#conexao;
    return new Promise((resolve, reject) => {
      cnn.query(sql, valor, function(error, result, fields){
        if(error){
          reject(error);
        }else{
          resolve(result.affectedRows > 0)
        }
      })
    })
  }

  ExecutaComandoLastInserted(sql, valor){
    var cnn = this.#conexao;
    return new Promise((resolve, reject) => {
      cnn.query(sql, valor, function(error, result, fields){
        if(error){
          reject(error)
        }else{
          resolve(result.insertId);
        }
      })
    })
  }

}
