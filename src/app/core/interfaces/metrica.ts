import { SubAtributoInterface } from "./sub-atributo";

export interface MetricaInterface {
    id_metrica: number;
    nombre: string;
    descripcion: string;
    formula: string;
    sub_atributo: SubAtributoInterface
}
