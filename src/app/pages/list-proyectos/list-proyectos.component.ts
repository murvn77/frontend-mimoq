import { Component } from '@angular/core';
import {RouterLink } from '@angular/router';
import { Proyecto } from '../../core/model/proyecto';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list-proyectos',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './list-proyectos.component.html',
  styleUrl: './list-proyectos.component.css'
})
export class ListProyectosComponent {
  // lista quemada de proyectos
  proyectos: Proyecto[] = [
    new Proyecto('Proyecto 1', 'Descripción del proyecto 1', 'https://www.google.com'),
    new Proyecto('Proyecto 2', 'Descripción del proyecto 2', 'https://www.google.com'),
    new Proyecto('Proyecto 3', 'Descripción del proyecto 3', 'https://www.google.com'),
    new Proyecto('Proyecto 4', 'Descripción del proyecto 4', 'https://www.google.com'),
    new Proyecto('Proyecto 5', 'Descripción del proyecto 5', 'https://www.google.com'),
  ];

}
