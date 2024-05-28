import { DespliegueInterface } from "./despliegue";
import { MetricaInterface } from "./metrica";

export interface ExperimentoInterface {
    id_experimento: number;
    nombre: string;
    duracion: number,
    cant_replicas: number;
    endpoints: string[];
    despliegues: DespliegueInterface[];
    metricas: MetricaInterface[];
    nombres_archivos: string[];
    carga: number;
}
