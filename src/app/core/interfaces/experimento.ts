import { CargaInterface } from "./carga";

export interface ExperimentoInterface {
    id_experimento: number;
    nombre: string;
    duracion: number,
    cant_replicas: number;
    endpoints: string[];
    despliegue: string,
    carga: number;
}
