import { DespliegueInterface } from "../../interfaces/despliegue";
import { Usuario } from "../usuario/usuario";

export class Proyecto {
    public id_proyecto?: number | null;
    public nombre?: String | null;
    public descripcion?: String | null;
    public nombres_microservicios?: string[] | null;
    public url_repositorio?: String | null;
    public urls_repositorios?: String[] | null;
    public despliegues?: DespliegueInterface[] | null;
    public docker_compose?: boolean | null;
    public dockerfile?: boolean | null;
    public fk_usuario?: number | null;

    constructor(
        nombre: String | null,
        descripcion: String | null,
        nombres_microservicios: string[] | null,
        url_repositorio?: String | null,
        urls_repositorios?: String[] | null,
        despliegues?: DespliegueInterface[] | null,
        docker_compose?: boolean | null,
        dockerfile?: boolean | null,
        fk_usuario?: number | null) {

        this.nombre = nombre,
        this.descripcion = descripcion,
        this.url_repositorio = url_repositorio,
        this.urls_repositorios = urls_repositorios,
        this.nombres_microservicios = nombres_microservicios,
        this.docker_compose = docker_compose,
        this.dockerfile = dockerfile,
        this.fk_usuario = fk_usuario
        this.despliegues = despliegues;
    }
}