import { SubAtributoInterface } from "./sub-atributo";

export interface AtributoInterface {
    id_atributo: number;
    nombre: string;
    descripcion: string;
    subatributos: SubAtributoInterface[];
}
