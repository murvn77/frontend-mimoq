import { Despliegue } from "../../interfaces/despliegue";
import { Usuario } from "../usuario/usuario";

export class Proyecto {
    public id_proyecto?: number | null;
    public nombre?: String | null;
    public descripcion?: String | null;
    public tipo_repositorio?: String | null;
    public url_repositorio?: String | null;
    public urls_repositorios?: String[] | null;
    public nombres_microservicios?: String[] | null;
    public despliegues?: Despliegue[] | null;
    public docker_compose?: boolean | null;
    public dockerfile?: boolean | null;
    public usuario?: Usuario | null;

    constructor(
        nombre?: String | null,
        descripcion?: String | null,
        tipo_repositorio?: String | null,
        url_repositorio?: String | null,
        urls_repositorios?: String[] | null,
        nombres_microservicios?: String[] | null,
        despliegues?: Despliegue[] | null,
        docker_compose?: boolean | null,
        dockerfile?: boolean | null,
        usuario?: Usuario | null) {

        this.nombre = nombre,
        this.descripcion = descripcion,
        this.tipo_repositorio = tipo_repositorio,
        this.url_repositorio = url_repositorio,
        this.urls_repositorios = urls_repositorios,
        this.nombres_microservicios = nombres_microservicios,
        this.docker_compose = docker_compose,
        this.dockerfile = dockerfile,
        this.usuario = usuario
        this.despliegues = despliegues;
    }
}