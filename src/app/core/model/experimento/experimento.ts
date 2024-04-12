import { Usuario } from "../usuario/usuario";

export class Experimento {
    constructor(
        public nombre: string,
        public replicas: string[],
        public cant_pods: number,
        public namespace: string,
        public fk_proyecto: number
    ) { }
}
