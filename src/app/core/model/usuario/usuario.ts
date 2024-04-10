import { Proyecto } from "../proyecto/proyecto";

export class Usuario {
    public id?:number | null;
    public documento?: number | null;
    public nombre?: string | null;
    public correo?: string | null;
    public contrasena?: string | null;
    public telefono?: number | null;
    public proyectos?: Proyecto[];
    public fk_id_rol_usuario?: number | null;

    constructor(nombre?: string | null,  documento?: number | null, telefono?: number | null, correo?: string | null, contrasena?: string | null, fk_id_rol_usuario?: number | null,){
        this.nombre = nombre,
        this.documento = documento,
        this.telefono = telefono,
        this.correo = correo,
        this.contrasena = contrasena,
        this.fk_id_rol_usuario = fk_id_rol_usuario
    }
}
