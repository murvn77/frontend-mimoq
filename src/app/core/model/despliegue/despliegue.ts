export class Despliegue {
    constructor(
        public nombre_helm: string,
        public replicas: number[],
        public cant_pods: number,
        public namespace: string,
        public autoescalado: boolean,
        public fk_proyecto: number,
        public min_replicas?: number,
        public max_replicas?: number,
        public utilization_cpu?: number,
    ) { }
}
