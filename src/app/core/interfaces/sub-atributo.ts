import { MetricaInterface } from "./metrica";

export interface SubAtributoInterface {
    id_subatributo: number;
    nombre: string;
    descripcion: string;
    metricas: MetricaInterface[];
}
