import base from "./base.js"

export default class UsuarioEntity extends base{
    #usu_id;
    #usu_nome;
    #usu_senha;
    #usu_email;

    get usu_id(){
        return this.#usu_id;
    }
    set usu_id(id){
        this.#usu_id = id;
    }

    get usu_nome(){
        return this.#usu_nome;
    }
    set usu_nome(nome){
        this.#usu_nome = nome;
    }

    get usu_senha(){
        return this.#usu_senha; 
    }
    set usu_senha(senha){
        this.#usu_senha = senha;
    }

    get usu_email(){
        return this.#usu_email;
    }
    set usu_email(email){
        this.#usu_email = email
    }

    constructor(id, nome, senha, email){
        super();
        this.#usu_id = id;
        this.#usu_nome = nome;
        this.#usu_senha = senha;
        this.#usu_email = email;
    }

}