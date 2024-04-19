import { Carga } from "../../interfaces/carga";
import { Usuario } from "../usuario/usuario";

export class Experimento {
    constructor(
        public nombre: string,
        public duracion: string,
        public replicas: number,
        public endpoints: string[],
        public carga: number,
    ) { }
}
