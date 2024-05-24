import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../model/usuario/usuario';
import { RolUsuario } from '../../enum/rol-usuario';

@Directive({
  selector: '[appPermissions]',
  standalone: true
})
export class PermissionsDirective implements OnInit {

  usuarioActual: Usuario = {} as Usuario
  private permissions: number[] = []
  //ViewContainerRef Ver limpiar ocultar eliminar directivas
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioActual = this.authService.getUsuario();
    console.log('USER', this.usuarioActual);
    this.updateView();
  }
  private updateView(): void {
    this.viewContainer.clear();
    if (this.validatePermissions()) {
      // Si tiene permisos escriba lo que está en el elemento
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
  private validatePermissions(): boolean {
    let havePermissions: boolean = false;
    if (this.usuarioActual && this.usuarioActual.rol) {
      // for (let rol in this.ROLES) {
        console.log("Permission", this.usuarioActual.rol.id_rol);
        if (this.usuarioActual.rol.id_rol === this.ROLES.Administrador) {
          console.log("Have permissions", this.ROLES.Administrador);
          havePermissions = true;
          return havePermissions;
        }
      // }
      
    }
    return havePermissions;
  }
  get ROLES() {
    return RolUsuario
  }
}
