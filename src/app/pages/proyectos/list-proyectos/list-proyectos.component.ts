import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Proyecto } from '../../../core/model/proyecto/proyecto';
import { CommonModule } from '@angular/common';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ROUTES_APP } from '../../../core/enum/routes.enum';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { VerProyectoComponent } from '../ver-proyecto/ver-proyecto.component';
import { ProyectoInterface } from '../../../core/interfaces/proyecto';
import { DespliegueInterface } from '../../../core/interfaces/despliegue';
import { Usuario } from '../../../core/model/usuario/usuario';
import { AuthService } from '../../../services/auth/auth.service';
import { DespliegueService } from '../../../services/despliegue/despliegue.service';

@Component({
  selector: 'app-list-proyectos',
  standalone: true,
  imports: [RouterLink,CommonModule,NgxPaginationModule, VerProyectoComponent],
  templateUrl: './list-proyectos.component.html',
  styleUrl: './list-proyectos.component.css'
})

export class ListProyectosComponent implements OnInit{

  proyectoActual: ProyectoInterface = {} as ProyectoInterface;
  despliegues: DespliegueInterface[] = {} as DespliegueInterface[];
  p: number = 1;
  mostrarInfo: boolean = false;
  proyectos: ProyectoInterface[] = [];
  suscription : Subscription = new Subscription;

  constructor(private router: Router,
    private proyectoService: ProyectoService,
    private authService:AuthService,
    private despliegueService: DespliegueService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const usuario: Usuario = this.authService.getUsuario();
    this.proyectoService.findByUser(usuario?.id_usuario || 0).subscribe(proyectos => {
      console.log('Proyectos',proyectos);
      this.proyectos = proyectos;
    });

    this.suscription = this.proyectoService.refresh.subscribe(() =>{
      this.proyectoService.findByUser(usuario?.id_usuario || 0).subscribe(proyectos => {
        console.log('Proyectos',proyectos);
        this.proyectos = proyectos;
      });
    })
  }
  getProyecto(id: any): void{
    this.proyectoService.findById(id).subscribe({
      next: (proyecto: any) => {
        this.proyectoActual = proyecto;
        this.despliegues = this.proyectoActual?.despliegues || [];
        this.despliegueService.setDespliegues(this.despliegues);
        console.log('Despliegues proyecto',this.proyectoActual);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
get ROUTES_APP(){
  return ROUTES_APP
}

// getProyecto(id: any): void{
//   this.proyectoService.findById(id).subscribe({
//     next: (proyecto: any) => {
//       this.proyectoActual = proyecto;
//       this.proyectoService.setProyecto(this.proyectoActual);
//     },
//     error: (error: any) => {
//       console.log(error);
//     }
//   });
// }
eliminarProyecto(id:number): void{
  Swal.fire({
    title: "¿Quieres eliminar este proyecto?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si, eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.proyectoService.delete(id).subscribe({
        next: (proyecto: any) => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "Su proyecto ha sido eliminado.",
            icon: "success"
          });
          this.router.navigate([ROUTES_APP.PROYECTOS]);
          // this.proyectos = this.proyectos.filter((proy) => {
          //   return proy.id_proyecto!== id;
          // });
        },
        error: (error: any) => {
          console.log(error);
          Swal.fire({
            title: "¡Error!",
            text: `Este proyecto no pudo ser eliminado: ${error.error.statusCode} ${error.error.message}`,
            icon: "error"
          });
        }});
    }
  });
}
crearDespliegue(){
  console.log("verProyecto",this.proyectoActual);
  this.proyectoService.setProyecto(this.proyectoActual);
  this.router.navigate([ROUTES_APP.DESPLIEGUES+'/'+ROUTES_APP.CREAR_DESPLIEGUE]);
}
dismissModal() {
  // const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal('prueba');
  // modal.hide();
  const myModal = document.getElementById('exampleModal')
const myInput = document.getElementById('myInput')

myModal?.addEventListener('hidden.bs.modal', event => {
  // do something...
})

}

  // public getIndex(proyectos: Proyecto[], proyectos: Proyecto): number {
  //   let id: number = -1;
  //   let contador: number = 0;
  //   for (let proy of proyectos) {
  //     if (proy.id === proyectos.id) {
  //       id = contador;
  //     }
  //     contador++;
  //   }
  //   return id;
  // }
}
