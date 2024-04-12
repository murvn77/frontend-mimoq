import { Component } from '@angular/core';
import { ROUTES_APP } from '../../../core/enum/routes.enum';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-proyecto.component.html',
  styleUrl: './edit-proyecto.component.css'
})
export class EditProyectoComponent {
  noTildesPattern = /^[^\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00FC]+$/;
  options = [
    {label: 'Si', value: 'Si'},
    {label: 'No', value: 'No'}
  ]

  proyectoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    repositorio: new FormControl('', [Validators.required]),
    selectedAllMicroservices: new FormControl('', [Validators.required]),
    urlsRepositorios: new FormArray([]),
    haveDockerfiles: new FormControl('', [Validators.required]),
    // nameAplication: new FormControl('', [Validators.required, Validators.pattern(this.noTildesPattern)])
  });

  constructor(private router:Router){}
  get urlsRepositorios() {
    return this.proyectoForm.get('urlsRepositorios') as FormArray;
  }

  addUrl() {
    this.urlsRepositorios.push(new FormControl(''));
  }
  deleteUrl(index:number) {
    this.urlsRepositorios.removeAt(index);
  }
}
function noTildesValidator(control: FormControl) {
  const value = control.value;
  if (value && /[áéíóúÁÉÍÓÚ]/.test(value)) {
    return { 'noTildes': true };
  }
  return null;
}