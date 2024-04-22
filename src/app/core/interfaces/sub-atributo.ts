import { AtributoInterface } from "./atributo";

export interface SubAtributoInterface {
    id_subatributo: number;
    nombre: string;
    descripcion: string;
    atributo: AtributoInterface;
}
