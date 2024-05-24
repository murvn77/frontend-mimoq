import { RolUsuarioInterface } from "../../interfaces/rol-usuario";
import { Proyecto } from "../proyecto/proyecto";

export class Usuario {
    constructor(    
        public documento: number,
        public nombre: string,
        public correo: string,
        public contrasena: string,
        public id_usuario?:number,
        public rol?: RolUsuarioInterface,
        public proyectos?: Proyecto[],
        public fk_id_rol_usuario?: number
    ){}
}
