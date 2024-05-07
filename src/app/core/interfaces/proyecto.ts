import { Usuario } from "../model/usuario/usuario";
import { DespliegueInterface } from "./despliegue";

export interface ProyectoInterface {
     id_proyecto: number;
     nombre: string;
     descripcion: string;
     url_repositorio?: string;
     urls_repositorios?: string[];
     nombres_microservicios: string[];
     docker_compose?: boolean;
     dockerfile?: boolean;
     despliegues?: DespliegueInterface[];
     usuario?: Usuario;
}
