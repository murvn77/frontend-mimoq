export class Experimento {
  constructor(
    public nombre: string,
    public duracion: string,
    public cant_replicas: number,
    public endpoints: string[],
    public fk_ids_despliegues: number[],
    public fk_ids_metricas: number[],
    public fk_id_carga: number,
    public iframes?: string[],
  ) { }
}
