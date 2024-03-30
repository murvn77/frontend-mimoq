export class Proyecto {
    public id?: number | null;
    public nombre?: String | null;
    public descripcion?: String | null;
    public url?: String | null;

    constructor(nombre?: String | null, descripcion?: String | null, url?: String | null){
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.url = url;
    }
}