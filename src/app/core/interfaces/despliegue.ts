export interface Despliegue {
    id_despliegue: number;
    nombre: string;
    cant_replicas: number;
    cant_pods: number;
    namespace: string,
    imagen: string;
    puerto: number
}
