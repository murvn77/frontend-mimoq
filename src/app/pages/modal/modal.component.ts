import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../core/model/usuario/usuario';
import Swal from 'sweetalert2';
import { ROUTES_APP } from '../../core/enum/routes.enum';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  usuario: Usuario = {} as Usuario;
  contrasenaForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    documento: new FormControl(0,[Validators.required]),
    nuevaContrasena: new FormControl('', [Validators.required, Validators.min(5)])
  });
  constructor(private router: Router,
    private usuarioService: UsuarioService
  ) { }
  cambiarContrasena() {
    const datos = this.contrasenaForm.value;
    const correo = datos.email;
    const documento = Number(datos.documento);
    const nuevaContrasena = datos.nuevaContrasena;
    if (this.contrasenaForm.valid) {
      this.usuarioService.findByEmail(correo || '').subscribe(usuario => {
        this.usuario = usuario;
        console.log('Usuario', this.usuario);
        if (correo == this.usuario.correo && documento == this.usuario.documento) {
          this.usuarioService.ressetPassword(this.usuario?.id_usuario || 0, this.usuario.contrasena, nuevaContrasena || '').subscribe({
            next: () => {
              Swal.fire('Actualizada', 'Contraseña actualizada', 'success');
              this.router.navigateByUrl(ROUTES_APP.LOGIN);
            },
            error: (error: any) => {
              console.log('error',error);
              Swal.fire('Error', `Ocurrió un error al cambiar la contraseña: ${error.error.message}`, 'error');
              console.log('error',error);
            }
          });
        }
      });
    }
  }
}
