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
  metricas: MetricaInterface[] = []
  subatributos: SubAtributoInterface[] = []
  ids_metricas: number[] = [];
  discMetrics: MetricaInterface[] = [];
  redMetrics: MetricaInterface[] = [];
  memoriaMetrics: MetricaInterface[] = [];
  cpuMetrics: MetricaInterface[] = [];

  constructor(private router: Router,
    private atributpService: AtributoService,
    private experimentoService: ExperimentoService
  ) { }
  ngOnInit(): void {
    this.atributpService.findAll().subscribe(atributos => {
      console.log('Atributos', atributos);
      this.atributos = atributos;
      this.atributos.forEach(atributo =>{
        this.subatributos = atributo.subatributos;
      });
      this.subatributos.forEach(subatributo =>{
        this.metricas = subatributo.metricas;
      });
      console.log('Atribut', this.atributos);
      console.log('Subatribut', this.subatributos);
      console.log('Metric', this.metricas);
      this.metricas.forEach(metrica => {
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
    
    
    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => {
    //   new bootstrap.Tooltip(tooltipTriggerEl)
    // })
  }
  crearExperimento() {
    const data = this.experimentoService.getExperimento();
    console.log('Data que llega', data);
    data.fk_ids_metricas = this.ids_metricas;
    console.log('Experimento', data);
    this.experimentoService.create(data).subscribe({
      next: (res: any) => {
        console.log('Experimento creado', res);
        Swal.fire({
          title: "Experimento creado",
          text: "El experimento ha sido creado correctamente",
          icon: "success"
        });

      }, error: (error: any) => {
        console.error('Error creando el experimento', error);
        Swal.fire('Error', 'Ocurrió un error al crear el experimento', 'error');
      }
      // console.log(despliegue);
      // this.router.navigateByUrl('/despliegues');
    });
  }
  verificar(metrica: MetricaInterface) {
    let pos = this.ids_metricas.indexOf(metrica.id_metrica);
    if (pos === -1) {
      this.ids_metricas.push(metrica.id_metrica);
    } else {
      this.ids_metricas.splice(pos, 1);
    }
    console.log('IDs Metricas', this.ids_metricas);
  }
  goBack() {
    this.router.navigateByUrl(ROUTES_APP.CREAR_PROYECTO);
  }
}