export interface Despliegue {
    id_despliegue: number;
    nombre: string;
    cant_replicas: number;
    cant_pods: number;
    namespace: string,
    label_despliegue_k8s: string;
    puerto: number
}
