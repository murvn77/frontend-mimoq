import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ROUTES_APP } from '../../../../core/enum/routes.enum';
import Swal from 'sweetalert2';
import { ExperimentoService } from '../../../../services/experimento/experimento.service';
import { ExperimentoInterface } from '../../../../core/interfaces/experimento';
import { Subscription } from 'rxjs';
import { CargaInterface } from '../../../../core/interfaces/carga';

@Component({
  selector: 'app-list-experimentos',
  standalone: true,
  imports: [RouterLink,CommonModule,NgxPaginationModule],
  templateUrl: './list-experimentos.component.html',
  styleUrl: './list-experimentos.component.css'
})
export class ListExperimentosComponent implements OnInit {
  p: number = 1;
  experimentos: ExperimentoInterface[] = [];
  carga: CargaInterface[] = [];
  suscription : Subscription = new Subscription;

  constructor(private router: Router, 
    private experimentoService: ExperimentoService) {}

  ngOnInit(): void {
    this.experimentoService.findAll().subscribe(experimentos => {
      console.log('Experimentos',experimentos);
      this.experimentos = experimentos;
    });

    this.suscription = this.experimentoService.refresh.subscribe(() =>{
      this.experimentoService.findAll().subscribe(experimentos => {
        console.log('Experimentos sus',experimentos);
        this.experimentos = experimentos;
      });
    })
  }

  get ROUTES_APP(){
    return ROUTES_APP;
  }

  eliminarExperimento(id:number): void{
    Swal.fire({
      title: "¿Quieres eliminar este experimento?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.experimentoService.delete(id).subscribe({
          next: (proyecto: any) => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "Su experimento ha sido eliminado.",
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
              text: `Este experimento no pudo ser eliminado: ${error.error.statusCode} ${error.error.message}`,
              icon: "error"
            });
          }});
      }
    });
  }
}
