import { Proyecto } from "../proyecto/proyecto";

export class Usuario {
    public id?:number | null;
    public cedula?: number | null;
    public nombre?: string | null;
    public email?: string | null;
    public telefono?: number | null;
    public proyectos?: Proyecto[];

    constructor(nombre?: string | null,  cedula?: number | null, telefono?: number | null, email?: string | null){
        this.nombre = nombre,
        this.cedula = cedula,
        this.telefono = telefono,
        this.email = email
    }
}
