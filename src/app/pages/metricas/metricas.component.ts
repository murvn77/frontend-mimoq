import { Component } from '@angular/core';
import { Atributo } from '../../core/model/atributo/atributo';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metricas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metricas.component.html',
  styleUrl: './metricas.component.css'
})
export class MetricasComponent {
  // lista quemada de atributos
  atributos: Atributo[] = [
    new Atributo('Desempeño', ['Comportamiento Temporal', 'Utilización de Recursos', 'Elasticidad']),
    new Atributo('Fiabilidad', ['Tolerancia a Fallos', 'Recuperación de Fallos', 'Precisión']),
    new Atributo('Seguridad', ['Confidencialidad', 'Integridad', 'Disponibilidad'])
  ];
  constructor(private router:Router){}
  currentAtributo: Atributo | null = null;

  setCurrentAtributo(atributo: Atributo) {
    this.currentAtributo = atributo;
  }
  goBack() {
    this.router.navigate(['/proyectos/crearProyecto']);
    }
}