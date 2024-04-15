import { Component } from '@angular/core';
import { Atributo } from '../../core/model/atributo/atributo';
import {Metrica} from '../../core/model/metrica/metrica';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTES_APP } from '../../core/enum/routes.enum';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-metricas',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './metricas.component.html',
  styleUrl: './metricas.component.css'
})
export class MetricasComponent {
  p: number = 1; //variable paginacion
  // lista quemada de atributos
  metricas: Metrica[] = [
    new Metrica('Comportamiento Temporal', 'CT = (Tf - Ti) / (N - 1)', 'CT es el tiempo promedio que tarda un sistema en responder a una solicitud de servicio. Tf es el tiempo de finalización de la última solicitud de servicio, Ti es el tiempo de inicio de la primera solicitud de servicio y N es el número total de solicitudes de servicio.'),
    new Metrica('Utilización de Recursos', 'UR = (Tf - Ti) / (N - 1)', 'UR es la fracción de tiempo que un recurso está ocupado. Tf es el tiempo de finalización de la última solicitud de servicio, Ti es el tiempo de inicio de la primera solicitud de servicio y N es el número total de solicitudes de servicio.'),
    new Metrica('Elasticidad', 'E = (Nf - Ni) / (Ni)', 'E es la capacidad de un sistema para adaptarse a la carga de trabajo cambiante. Nf es el número de solicitudes de servicio finalizadas y Ni es el número de solicitudes de servicio iniciadas.'),    
  ];

  atributos: Atributo[] = [
    new Atributo('Comportamiento Temporal', this.metricas),
    new Atributo('Utilización de Recursos', this.metricas),
    new Atributo('Elasticidad', this.metricas),
  ];
  
  constructor(private router:Router){}
  currentAtributo: Atributo | null = null;

  setCurrentAtributo(atributo: Atributo) {
    this.currentAtributo = atributo;
  }
  goBack() {
    this.router.navigateByUrl(ROUTES_APP.CREAR_PROYECTO);
    }
}

