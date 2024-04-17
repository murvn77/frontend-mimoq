import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../core/model/usuario/usuario';
import Swal from 'sweetalert2';
import { ROUTES_APP } from '../../core/enum/routes.enum';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  urlBackend: string  = 'http://localhost:3000/api';
  registroExitoso = false;
  usuarioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  
  constructor(private usuarioService:UsuarioService, private router:Router){}
  crearUsuario() {
    const nuevoUsuario = this.usuarioForm.value;
    if (this.usuarioForm.valid) {
      const data: Usuario = {
        nombre: nuevoUsuario.nombre || '',
        correo: nuevoUsuario.email || '',
        documento: Number(nuevoUsuario.documento) || 0,
        contrasena: nuevoUsuario.contrasena || '',
        fk_id_rol_usuario: 2 || 0
      }
      this.usuarioService.create(data).subscribe({
        next: (res: any) => {
          console.log('Usuario creado', res);
          Swal.fire('Registrado', 'Usuario registrado', 'success');
          this.router.navigateByUrl(ROUTES_APP.LOGIN);
        }, error: (error: any) => {
          console.error('Error creando usuario', error);
          Swal.fire('Error', 'Ocurrió un error al registrar usuario', 'error');
        }
      });
    }
  }
}
