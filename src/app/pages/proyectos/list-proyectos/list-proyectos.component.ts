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

@Component({
  selector: 'app-list-proyectos',
  standalone: true,
  imports: [RouterLink,CommonModule,NgxPaginationModule, VerProyectoComponent],
  templateUrl: './list-proyectos.component.html',
  styleUrl: './list-proyectos.component.css'
})
//export class ListProyectosComponent implements OnInit{
export class ListProyectosComponent implements OnInit{
  // lista quemada de proyectos
  // proyectos: Proyecto[] = [
  //   new Proyecto('Proyecto 1', 'Descripción del proyecto 1', 'individual','https://www.google.com'),
  //   new Proyecto('Proyecto 2', 'Descripción del proyecto 2', 'https://www.google.com'),
  //   new Proyecto('Proyecto 3', 'Descripción del proyecto 3', 'https://www.google.com'),
  //   new Proyecto('Proyecto 4', 'Descripción del proyecto 4', 'https://www.google.com'),
  //   new Proyecto('Proyecto 5', 'Descripción del proyecto 5', 'https://www.google.com'),
  //   new Proyecto('Proyecto 6', 'Descripción del proyecto 6', 'https://www.google.com'),
  //   new Proyecto('Proyecto 7', 'Descripción del proyecto 7', 'https://www.google.com'),
  //   new Proyecto('Proyecto 8', 'Descripción del proyecto 8', 'https://www.google.com'),
  //   new Proyecto('Proyecto 9', 'Descripción del proyecto 9', 'https://www.google.com'),
  //   new Proyecto('Proyecto 10', 'Descripción del proyecto 10', 'https://www.google.com'),
  //   new Proyecto('Proyecto 11', 'Descripción del proyecto 11', 'https://www.google.com'),
  // ];
  proyectoActual: ProyectoInterface = {} as ProyectoInterface;
  p: number = 1;
  mostrarInfo: boolean = false;
  proyectos: ProyectoInterface[] = [];
  suscription : Subscription = new Subscription;

  constructor(private router: Router, 
    private proyectoService: ProyectoService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.proyectoService.findAll().subscribe(proyectos => {
      console.log('Proyectos',proyectos);
      this.proyectos = proyectos;
    });

    this.suscription = this.proyectoService.refresh.subscribe(() =>{
      this.proyectoService.findAll().subscribe(proyectos => {
        console.log('Proyectos',proyectos);
        this.proyectos = proyectos;
      });
    })
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
