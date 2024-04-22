import { Component, OnInit } from '@angular/core';
import { Atributo } from '../../core/model/atributo/atributo';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTES_APP } from '../../core/enum/routes.enum';
import { TooltipDirective } from '../../core/directives/tooltip.directive';
import { MetricaService } from '../../services/metrica/metrica.service';
import { MetricaInterface } from '../../core/interfaces/metrica';
import { ExperimentoService } from '../../services/experimento/experimento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metricas',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './metricas.component.html',
  styleUrl: './metricas.component.css'
})
export class MetricasComponent implements OnInit {
  // lista quemada de atributos
  atributos: Atributo[] = [
    new Atributo('Eficiencia de Rendimiento', 'Eficiencia de rendimiento se refiere al rendimiento relacionado con la cantidad de recursos utilizados.', ['Comportamiento Temporal', 'Utilización de Recursos', 'Elasticidad']),
    new Atributo('Fiabilidad', 'La mantenibilidad se refiere a qué tan bien se puede modificar un producto o sistema para mejorar, corregir o adaptarse a los cambios en el entorno, así como a los requisitos.', ['Madurez', 'Disponibilidad', 'Tolerancia a Fallos', 'Recuperación de Fallos']),
    new Atributo('Seguridad', 'La seguridad se refiere a qué tan bien un producto o sistema protege la información y los datos de las vulnerabilidades de seguridad.', ['Confidencialidad', 'Integridad', 'Responsabilidad'])
  ];
  metricas: MetricaInterface[] = []
  constructor(private router: Router,
    private metricaService: MetricaService,
    private experimentoService: ExperimentoService
  ) { }
  ngOnInit(): void {
    console.log('hola');
    this.metricaService.findAll().subscribe(metricas => {
      console.log('Proyectos', metricas);
      this.metricas = metricas;
    });

    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => {
    //   new bootstrap.Tooltip(tooltipTriggerEl)
    // })
  }

  obtenerAtributos() {

  }
  currentAtributo: Atributo | null = null;

  crearExperimento() {
    const data = this.experimentoService.getExperimento();
    console.log('Data que llega',data);
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

  setCurrentAtributo(atributo: Atributo) {
    this.currentAtributo = atributo;
  }
  goBack() {
    this.router.navigateByUrl(ROUTES_APP.CREAR_PROYECTO);
  }
}