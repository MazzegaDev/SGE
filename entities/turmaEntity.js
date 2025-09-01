export default class TurmaEntity {
  #id;
  #nome;
  #periodo;

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

  constructor(id, nome, periodo) {
    this.#id = id;
    this.#nome = nome;
    this.#periodo = periodo;
  }

  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      periodo: this.#periodo,
    };
  }
}
