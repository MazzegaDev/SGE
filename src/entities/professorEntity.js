import Base from "./base.js";

export default class ProfessorEntity extends Base{
  #id;
  #nome;
  #email;
  #materia;

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

  get materia() {
    return this.#materia;
  }

  set materia(materia) {
    this.#materia = materia;
  }

  constructor(id, nome, email, materia) {
    super();
    this.#id = id;
    this.#nome = nome;
    this.email = email;
    this.#materia = materia;
  }
}
