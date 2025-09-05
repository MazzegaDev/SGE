import Base from "./base.js";

export default class TurmaEntity extends Base{
  #id;
  #nome;
  #periodo;
  #professor;

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

  get periodo() {
    return this.#periodo;
  }

  set periodo(periodo) {
    this.#periodo = periodo;
  }

  get professor(){
    return this.#professor;
  }

  set professor(professor){
    this.#professor = professor;
  }

  constructor(id, nome, periodo, professor) {
    super();
    this.#id = id;
    this.#nome = nome;
    this.#periodo = periodo;
    this.#professor = professor
  }


}
