import { Usuario } from "../model/usuario/usuario";

export interface Proyecto {
     id_proyecto: number;
     nombre: string;
     descripcion: string;
     tipo_repositorio: string;
     url_repositorio?: string;
     urls_repositorios?: string[];
     nombres_microservicios: string[];
     docker_compose?: boolean;
     dockerfile?: boolean;
     usuario?: Usuario;
}
