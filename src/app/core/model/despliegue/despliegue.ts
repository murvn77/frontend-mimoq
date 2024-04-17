import { Usuario } from "../usuario/usuario";

export class Despliegue {
    constructor(
        public nombre: string,
        public replicas: number[],
        public cant_pods: number,
        public namespace: string,
        public fk_proyecto: number
    ) { }
}
