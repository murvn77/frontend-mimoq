import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsuarioInterface } from '../../../../core/interfaces/usuario';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ProyectoService } from '../../../../services/proyecto/proyecto.service';
import { ROUTES_APP } from '../../../../core/enum/routes.enum';
import { ProyectoInterface } from '../../../../core/interfaces/proyecto';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../../core/model/usuario/usuario';
import { RolUsuario } from '../../../../core/enum/rol-usuario';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {

  usuarioSeleccionado: UsuarioInterface = {} as UsuarioInterface;
  usuarioEditar: Usuario = {} as Usuario;
  p: number = 1;
  mostrarInfo: boolean = false;
  usuarios: UsuarioInterface[] = [];
  proyectosUsuario: ProyectoInterface[] = [];
  suscription: Subscription = new Subscription;

  usuarioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.minLength(5)]),
    rol: new FormControl(),
  });

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    // this.usuarioActual = this.authService.getUsuario();
    console.log('USER',this.authService.getUsuario());
    console.log('Initial', this.ROLES)
    this.usuarioService.findAll().subscribe(usuarios => {
      console.log('usuarios', usuarios);
      this.usuarios = usuarios;
    });

    this.suscription = this.usuarioService.refresh.subscribe(() => {
      this.usuarioService.findAll().subscribe(usuarios => {
        console.log('usuarios', usuarios);
        this.usuarios = usuarios;
      });
    })
  }
  getUsuario(id: any): void {
    this.usuarioService.findById(id).subscribe({
      next: (usuario: any) => {
        this.usuarioSeleccionado = usuario;
        this.usuarioEditar = usuario;
        this.usuarioForm.patchValue({
          nombre: this.usuarioEditar.nombre,
          documento: String(this.usuarioEditar.documento),
          email: this.usuarioEditar.correo,
          contrasena: this.usuarioEditar.contrasena
        });
        console.log('Usuario seleccionado', this.usuarioSeleccionado);
        this.proyectosUsuario = this.usuarioSeleccionado?.proyectos || [];
        // this.despliegueService.setDespliegues(this.despliegues);
        console.log('Proyectos usuario', this.proyectosUsuario);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  crearUsuario() {
    this.router.navigate([ROUTES_APP.REGISTRO]);
  }

  eliminarUsuario(id: number): void {
    Swal.fire({
      title: "¿Quieres eliminar este usuario?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(id).subscribe({
          next: (usuario: any) => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El usuario ha sido eliminado.",
              icon: "success"
            });
            this.router.navigate([ROUTES_APP.USUARIOS]);
            // this.proyectos = this.proyectos.filter((proy) => {
            //   return proy.id_proyecto!== id;
            // });
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              title: "¡Error!",
              text: `Este usuario no pudo ser eliminado: ${error.error.statusCode} ${error.error.message}`,
              icon: "error"
            });
          }
        });
      }
    });
  }

  actualizarUsuario() {
    console.log('ENTRA A ACTUALIZAR', this.usuarioEditar.id_usuario);
    const nuevoUsuario = this.usuarioForm.value;
    if (this.usuarioForm.valid) {
      console.log('FORM VALIDO', this.usuarioEditar.id_usuario);
      const data: Usuario = {
        nombre: nuevoUsuario.nombre || '',
        correo: nuevoUsuario.email || '',
        documento: Number(nuevoUsuario.documento) || 0,
        contrasena: nuevoUsuario.contrasena || ''
      }
      this.showLoading();
      this.usuarioService.update(this.usuarioEditar?.id_usuario || 0, data).subscribe({
        next: (res: any) => {
          console.log('Usuario actualizado', res);
          Swal.fire('Actualizado', 'Usuario actualizado', 'success');
          this.router.navigateByUrl(ROUTES_APP.USUARIOS);
        }, error: (error: any) => {
          console.error('Error actualizando usuario', error);
          // this.loading = false;
          this.hideLoading();
          Swal.fire('Error', 'Ocurrió un error al actualizar usuario', 'error');
        }
      });
    }
    console.log('FORM NO VALIDO', this.usuarioForm);
  }
  cerrarInfo() {
    this.usuarioSeleccionado = {} as UsuarioInterface;
  }
  showLoading() {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera!',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }
  hideLoading() {
    Swal.close();
  }
//   obtenerNombreRolUsuario(valor: number): string | undefined {
//     for (const key in RolUsuario) {
//         if (RolUsuario[key] === valor) {
//             return key;
//         }
//     }
//     return undefined; // Manejo de caso donde no se encuentra el valor
// }
  get ROUTES_APP() {
    return ROUTES_APP
  }
  get ROLES() {
    return RolUsuario
  }
}
