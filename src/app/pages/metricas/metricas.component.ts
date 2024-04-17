import { Component, OnInit } from '@angular/core';
import { Atributo } from '../../core/model/atributo/atributo';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTES_APP } from '../../core/enum/routes.enum';
import * as bootstrap from 'bootstrap';
import { TooltipDirective } from '../../core/directives/tooltip.directive';

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
  constructor(private router: Router) { }
  ngOnInit(): void {
    console.log('hola');
    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => {
    //   new bootstrap.Tooltip(tooltipTriggerEl)
    // })
  }

  currentAtributo: Atributo | null = null;

  setCurrentAtributo(atributo: Atributo) {
    this.currentAtributo = atributo;
  }
  goBack() {
    this.router.navigateByUrl(ROUTES_APP.CREAR_PROYECTO);
  }
}