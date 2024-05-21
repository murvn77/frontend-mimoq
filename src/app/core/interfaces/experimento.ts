import { DespliegueInterface } from "./despliegue";

export interface ExperimentoInterface {
    id_experimento: number;
    nombre: string;
    duracion: number,
    cant_replicas: number;
    endpoints: string[];
    despliegues: DespliegueInterface[];
    nombres_archivos: string[];
    carga: number;
}
