import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Carga } from '../../../core/model/carga/carga';

@Component({
  selector: 'app-experimento',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './experimento.component.html',
  styleUrl: './experimento.component.css'
})
export class ExperimentoComponent {
  p: number = 1;
  carga : Carga = {} as Carga;
  cant_usuarios: number[] = [];
  microservicios: string[] = [];
  duracion_picos: string[] = [];

  experimentoForm = new FormGroup({
    duracion: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    replicas: new FormControl('', [Validators.required]),
  });

}