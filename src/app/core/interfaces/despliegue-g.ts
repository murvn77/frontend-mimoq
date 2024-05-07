import { DespliegueInterface } from "./despliegue";

export interface DespliegueG {
    nombre_helm: string;
    namespace: string;
    cant_pods: number;
    despliegues?: DespliegueInterface[];
}
