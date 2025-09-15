import base from "./base.js"

export default class UsuarioEntity extends base{
    #id;
    #nome;
    #senha;
    #email;
    #ativo;
    #perfil;

    get id(){
        return this.#id;
    }
    set id(id){
        this.#id = id;
    }

    get nome(){
        return this.#nome;
    }
    set nome(nome){
        this.#nome = nome;
    }

    get senha(){
        return this.#senha; 
    }
    set senha(senha){
        this.#senha = senha;
    }

    get email(){
        return this.#email;
    }
    set email(email){
        this.#email = email
    }

    get perfil(){
        return this.#perfil;
    }

    set perfil(perfil){
        this.#perfil = perfil;
    }

    get ativo(){
        return this.#ativo; 
    }

    set ativo(ativo){
        this.#ativo = ativo;
    }


    constructor(id, nome, senha, email, perfil, ativo){
        super();
        this.#id = id;
        this.#nome = nome;
        this.#senha = senha;
        this.#email = email;
        this.#perfil = perfil;
        this.#ativo = ativo;
    }

}