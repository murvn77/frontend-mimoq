export interface DespliegueInterface {
    id_despliegue: number;
    nombre: string;
    cant_replicas: number;
    cant_pods: number;
    namespace: string;
    puerto: number;
    nombre_helm: string;
}
