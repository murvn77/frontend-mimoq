import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-experimento',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './experimento.component.html',
  styleUrl: './experimento.component.css'
})
export class ExperimentoComponent {

  p: number = 1;
  
  experimentoForm = new FormGroup({
    duracion: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    replicas: new FormControl('', [Validators.required]),
  });

}