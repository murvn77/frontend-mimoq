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

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [RouterLink,NgxPaginationModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {
  
  usuarioSeleccionado: UsuarioInterface = {} as UsuarioInterface;;
  p: number = 1;
  mostrarInfo: boolean = false;
  usuarios: UsuarioInterface[] = [];
  proyectosUsuario: ProyectoInterface[] = [];
  suscription : Subscription = new Subscription;

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private authService:AuthService,
    private proyectoService: ProyectoService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe(usuarios => {
      console.log('usuarios',usuarios);
      this.usuarios = usuarios;
    });

    this.suscription = this.usuarioService.refresh.subscribe(() =>{
      this.usuarioService.findAll().subscribe(usuarios => {
        console.log('usuarios',usuarios);
        this.usuarios = usuarios;
      });
    })
  }
  getUsuario(id: any): void{
    this.usuarioService.findById(id).subscribe({
      next: (usuario: any) => {
        this.usuarioSeleccionado = usuario;
        console.log('Usuario seleccionado',this.usuarioSeleccionado);
        this.proyectosUsuario = this.usuarioSeleccionado?.proyectos || [];
        // this.despliegueService.setDespliegues(this.despliegues);
        console.log('Proyectos usuario',this.proyectosUsuario);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  crearUsuario(){
    this.router.navigate([ROUTES_APP.REGISTRO]);
  }

  eliminarUsuario(id:number): void{
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
          }});
      }
    });
  }
get ROUTES_APP(){
  return ROUTES_APP
}
}
