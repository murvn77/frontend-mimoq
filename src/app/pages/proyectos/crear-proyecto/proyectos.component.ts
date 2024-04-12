import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ROUTES_APP } from '../../../core/enum/routes.enum';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { Proyecto } from '../../../core/model/proyecto/proyecto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {
  noTildesPattern = /^[^\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00FC]+$/;
  options = [
    {label: 'Si', value: true},
    {label: 'No', value: false}
  ]
  proyectoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    repositorio: new FormControl('', [Validators.required]),
    selectedAllMicroservices: new FormControl('', [Validators.required]),
    urlsRepositorios: new FormArray([]),
    haveDockerfiles: new FormControl(false, [Validators.required]),
    // nameAplication: new FormControl('', [Validators.required, Validators.pattern(this.noTildesPattern)])
  });
  constructor(private router:Router,
    private proyectoService: ProyectoService, 
  ){}
  crearProyecto(): void {
    const nuevoProyecto = this.proyectoForm.value;
    if (this.proyectoForm.valid) {
      const data: Proyecto = {
        nombre: nuevoProyecto.name || '',
        descripcion: nuevoProyecto.description || '',
        tipo_repositorio: nuevoProyecto.selectedAllMicroservices || '',
        url_repositorio: nuevoProyecto.repositorio || '',
        // docker_compose: nuevoProyecto.selectedAllMicroservices || false,
        dockerfile: nuevoProyecto.haveDockerfiles || false,
        fk_usuario: 2 || 0
      }
      this.proyectoService.create(data).subscribe({
        next: (res: any) => {
          console.log('Usuario creado', res);
          Swal.fire('Cer', 'Proyecto creado', 'success');
          this.router.navigateByUrl(ROUTES_APP.LOGIN);
        }, error: (error: any) => {
          console.error('Error creando usuario', error);
          Swal.fire('Error', 'Ocurrió un error al registrar usuario', 'error');
        }
      });
    }
    // this.proyectoService.create(this.proyecto)
  }
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
