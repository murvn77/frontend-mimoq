import { ProyectoInterface } from "./proyecto";

export interface UsuarioInterface {
    id_usuario: number;
    nombre: string;
    correo: string;
    documento: number;
    contrasena: string;
    proyectos?: ProyectoInterface[];
}
