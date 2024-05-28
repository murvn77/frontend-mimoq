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

  descargarResultados(id_experimento:number){
    console.log('ID_EXPERIMENTO',id_experimento);
    this.showLoading();
    this.experimentoService.findFile(id_experimento)
    .subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/zip' }); // Creamos un nuevo Blob con el tipo de archivo correcto
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Resultados completos'; // Nombre del archivo que recibimos del servidor
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      Swal.fire({
        title: "Resultados descargados",
        text: "Los resultados del experimento han sido descargados, verificar su carpeta de descargas",
        icon: "success",
      });
    },
    (error) => {
      console.error('Error al descargar los resultados del experimento:', error);
      Swal.fire({
        title: "Error",
        text: `Hubo un error al intentar descargar los resultados del experimento:${error.status} ${error.statusText}`,
        icon: "error",
      });
    }
  );
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
            this.router.navigate([ROUTES_APP.EXPERIMENTO]);
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
  showLoading() {
    Swal.fire({
      title: 'Descargando...',
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
}
