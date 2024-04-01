export class Atributo {
    public id?:number | null;
    public nombre?: string | null;
    public sub_atributos?: String[];

    constructor(nombre?: string | null, sub_atributos?: String[]) {
        this.nombre = nombre;
        this.sub_atributos = sub_atributos;
    }
}