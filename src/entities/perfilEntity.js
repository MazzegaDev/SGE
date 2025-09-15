import Base from "./base.js";

export default class PerfilEntity extends Base{
    #id;
    #desc;


    get id(){return this.#id}; set id(id){this.#id = id};
    get desc(){return this.#desc}; set desc(desc){this.#desc = desc};

    
    constructor(id, desc){
        super();
        this.#id = id;
        this.#desc = desc;
    }
}