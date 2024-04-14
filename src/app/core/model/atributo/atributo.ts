import { Metrica } from "../metrica/metrica";
export class Atributo {
    public id?:number | null;
    public nombre?: string | null;
    public metricas?: Metrica[] | null;
    

    constructor(nombre?: string | null, metricas?: Metrica[] | null) {
        this.nombre = nombre;
        this.metricas = metricas;
    }
}