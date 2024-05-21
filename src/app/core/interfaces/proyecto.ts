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
     imagenes_deploy?: string[];
     puertos_imagenes?: string[];
     puertos_deploy?: string[];
     despliegues?: DespliegueInterface[];
     usuario?: Usuario;
}
