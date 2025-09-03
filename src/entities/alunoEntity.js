export default class AlunoEntity {
  #id;
  #nome;
  #email;
  #idade;
  #turma; //Chave estrangeira

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }

  get nome() {
    return this.#nome;
  }

  set nome(nome) {
    this.#nome = nome;
  }

  get email() {
    return this.#email;
  }

  set email(email) {
    this.#email = email;
  }

  get idade() {
    return this.#idade;
  }

  set idade(idade) {
    this.#idade = idade;
  }

  get turma() {
    return this.#turma;
  }

  set turma(turma) {
    this.#turma = turma;
  }

  constructor(id, nome, email, idade, turma) {
    this.#id = id;
    this.#nome = nome;
    this.email = email;
    this.#idade = idade;
    this.#turma = turma;
  }

  toJSON(){
    return{
        id: this.#id,
        nome: this.#nome,
        email: this.#email,
        idade: this.#idade,
        turma: this.#turma,
    }
  }
}
