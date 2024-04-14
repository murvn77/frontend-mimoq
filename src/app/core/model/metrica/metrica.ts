export class Metrica {

    public id?:number | null;
    public nombre?: string | null;
    public formula?: string | null;
    public descripcion?: string | null;

    constructor(nombre?: string | null, formula?: string | null, descripcion?: string | null) {
        this.nombre = nombre;
        this.formula = formula;
        this.descripcion = descripcion;
    }
}