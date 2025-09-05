import Base from "./base.js";

export default class MateriaEntity extends Base{
  #id;
  #nome;

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

  constructor(id, nome) {
    super();
    this.#id = id;
    this.#nome = nome;
  }


}
