import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-despliegues',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './despliegues.component.html',
  styleUrl: './despliegues.component.css'
})
export class DesplieguesComponent {
  p: number = 1;
  
  despliegueForm = new FormGroup({
    duracion: new FormControl('', [Validators.required]),
    replicas: new FormControl('', [Validators.required]),
  });

}
