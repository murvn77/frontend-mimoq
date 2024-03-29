import { Component, OnInit } from '@angular/core';
import {RouterLink } from '@angular/router';
import { Proyecto } from '../../core/model/proyecto/proyecto';
import { CommonModule } from '@angular/common';
import { ProyectoService } from '../../services/proyecto/proyecto.service';

@Component({
  selector: 'app-list-proyectos',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './list-proyectos.component.html',
  styleUrl: './list-proyectos.component.css'
})
//export class ListProyectosComponent implements OnInit{
export class ListProyectosComponent{
  // lista quemada de proyectos
  proyectos: Proyecto[] = [
    new Proyecto('Proyecto 1', 'Descripción del proyecto 1', 'https://www.google.com'),
    new Proyecto('Proyecto 2', 'Descripción del proyecto 2', 'https://www.google.com'),
    new Proyecto('Proyecto 3', 'Descripción del proyecto 3', 'https://www.google.com'),
    new Proyecto('Proyecto 4', 'Descripción del proyecto 4', 'https://www.google.com'),
    new Proyecto('Proyecto 5', 'Descripción del proyecto 5', 'https://www.google.com'),
  ];

  //proyectos: Proyecto[] = [];

  // constructor(
  //   private proyectoService: ProyectoService
  // ) { }

  // ngOnInit(): void {
  //   this.proyectoService.findAll().subscribe(proyectos => {
  //     this.proyectos = proyectos;
  //   });
  // }

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
