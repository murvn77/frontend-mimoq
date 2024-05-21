import { Component, OnInit } from '@angular/core';
import { Atributo } from '../../core/model/atributo/atributo';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTES_APP } from '../../core/enum/routes.enum';
import { TooltipDirective } from '../../core/directives/tooltip.directive';
import { ExperimentoService } from '../../services/experimento/experimento.service';
import Swal from 'sweetalert2';
import { AtributoInterface } from '../../core/interfaces/atributo';
import { AtributoService } from '../../services/atributos/atributo.service';
import { SubAtributoInterface } from '../../core/interfaces/sub-atributo';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MetricaInterface } from '../../core/interfaces/metrica';

@Component({
  selector: 'app-metricas',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './metricas.component.html',
  styleUrl: './metricas.component.css'
})
export class MetricasComponent implements OnInit {
  // lista quemada de atributos
  // atributos: Atributo[] = [
  //   new Atributo(1,'Eficiencia de Rendimiento', 'Eficiencia de rendimiento se refiere al rendimiento relacionado con la cantidad de recursos utilizados.', [
  //     new SubAtributoInterface ('Comportamiento Temporal'), 'Utilización de Recursos', 'Elasticidad']),
  //   new Atributo(2,'Fiabilidad', 'La fiabilidad se refiere a qué tan bien un sistema, producto o componente realiza funciones específicas en condiciones específicas.', ['Madurez', 'Disponibilidad', 'Tolerancia a Fallos', 'Recuperación de Fallos']),
  //   new Atributo(3,'Seguridad', 'La seguridad se refiere a qué tan bien un producto o sistema protege la información y los datos de las vulnerabilidades de seguridad.', ['Confidencialidad', 'Integridad', 'Responsabilidad'])
  // ];
  atributos: AtributoInterface[] = []
  ids_metricas: number[] = [];
  iframes: string[] = [];
  discMetrics: MetricaInterface[] = [];
  redMetrics: MetricaInterface[] = [];
  memoriaMetrics: MetricaInterface[] = [];
  cpuMetrics: MetricaInterface[] = [];
  seleccionMetrica: boolean = false;

  constructor(private router: Router,
    private atributoService: AtributoService,
    private experimentoService: ExperimentoService
  ) { }
  ngOnInit(): void {
    this.atributoService.findAll().subscribe(atributos => {
      console.log('Atributos', atributos);
      this.atributos = atributos;
      this.atributos.forEach(atributo => {
        atributo.subatributos.forEach(subatributo => {
          subatributo.metricas.forEach(metrica => {
            console.log('Metric', metrica);
            switch (metrica.grupo) {
              case "DISCO":
                this.discMetrics.push(metrica);
                break;
              case "RED":
                this.redMetrics.push(metrica);
                break;
              case "MEMORIA":
                this.memoriaMetrics.push(metrica);
                break;
              case "CPU":
                this.cpuMetrics.push(metrica);
                break;
              default:
                break;
            }
          });
        });
      });
      console.log('discMetrics', this.discMetrics);
      console.log('redMetrics', this.redMetrics);
      console.log('memoriaMetrics', this.memoriaMetrics);
      console.log('cpuMetrics', this.cpuMetrics);
    });
  }
  goToDashboard() {
    this.router.navigateByUrl(ROUTES_APP.DASHBOARD);
  }
  crearExperimento() {
    if (this.ids_metricas.length == 0) {
      this.seleccionMetrica = false;
    } else {
      this.seleccionMetrica = true;
      const data = this.experimentoService.getExperimento();
      console.log('Data que llega', data);
      data.fk_ids_metricas = this.ids_metricas;
      console.log('Experimento', data);
      this.showLoading();
      this.experimentoService.createDashboard(data).subscribe({
        next: (res: any) => {
          console.log('Experimento creado', res);
          this.iframes = res;
          console.log('IFRAMES', this.iframes)
          this.experimentoService.setIFrames(this.iframes)
          Swal.fire({
            title: "Experimento creado",
            text: "El experimento ha sido creado correctamente",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ir a dashboard",
            cancelButtonText: "Lista de experimentos"
          }).then((result) => {
            if (result.isConfirmed) {
              this.goToDashboard()
            } else {
              this.router.navigateByUrl(ROUTES_APP.EXPERIMENTO);
            }
          });
        }, error: (error: any) => {
          console.error('Error creando el experimento', error);
          this.hideLoading();
          Swal.fire('Error', 'Ocurrió un error al crear el experimento', error);
          // this.hideLoading();
        }
        // console.log(despliegue);
        // this.router.navigateByUrl('/despliegues');
      });
    }
  }
  verificar(metrica: MetricaInterface) {
    let pos = this.ids_metricas.indexOf(metrica.id_metrica);
    if (pos === -1) {
      this.ids_metricas.push(metrica.id_metrica);
      this.seleccionMetrica = true;
    } else {
      this.ids_metricas.splice(pos, 1);
      if(this.ids_metricas.length == 0){
        this.seleccionMetrica = false;
      }
    }
    console.log('IDs Metricas', this.ids_metricas);
  }

  goBack() {
    this.router.navigateByUrl(ROUTES_APP.CREAR_PROYECTO);
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
}
