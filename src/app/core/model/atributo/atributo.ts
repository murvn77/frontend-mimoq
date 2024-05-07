export class Atributo {
    public id?:number | null;
    public nombre?: string | null;
    public descripcion?: string | null;
    public subatributos?: string[];

    constructor(nombre?: string | null, descripcion?: string | null, sub_atributos?: string[]) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subatributos = sub_atributos;
    }
}