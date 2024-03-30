import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {
  constructor(private router:Router){}
  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    selectedAllMicroservices: new FormControl('', [Validators.required]),
    urlsRepositorios: new FormArray([]),
  });

  get urlsRepositorios() {
    return this.customerForm.get('urlsRepositorios') as FormArray;
  }

  addUrl() {
    this.urlsRepositorios.push(new FormControl(''));
  }
  deleteUrl(index:number) {
    this.urlsRepositorios.removeAt(index);
  }
}

// addUrl() {
//   const formGroup = document.createElement('div');
//   formGroup.className = 'form-group form-url';
//   formGroup.innerHTML = `
//     <label for="inputUrlrepo${document.querySelectorAll('.form-url').length + 1}" class="section-label">Url repositorio</label>
//     <input
//       type="url"
//       formControlName="repositorio"
//       placeholder="Repositorio"
//       id="inputUrlrepo${document.querySelectorAll('.form-url').length + 1}"
//       class="form-control"
//     />
//     <div class="invalid-feedback">
//       Url requerido
//     </div>
//   `;
//   const btnGroup = document.querySelector('.btn-group');
//   if (btnGroup) {
//     btnGroup.before(formGroup);
//   }
// }

// deleteUrl() {
//   const formUrls = document.getElementsByClassName('form-url');
//   if (formUrls.length > 1) {
//     const lastFormUrl = formUrls[formUrls.length - 1];
//     if (lastFormUrl) {
//       lastFormUrl.remove();
//     }
//   }
// }
