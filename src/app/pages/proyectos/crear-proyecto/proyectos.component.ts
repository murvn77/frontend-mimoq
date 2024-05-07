import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ROUTES_APP } from '../../../core/enum/routes.enum';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { Proyecto } from '../../../core/model/proyecto/proyecto';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../../core/model/usuario/usuario';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent implements OnInit {
  noTildesPattern = /^[^\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00FC]+$/;
  options = [
    {label: 'Si', value: true},
    {label: 'No', value: false}
  ]
  loading: boolean = false;
  inputHabilitado = true;
  urlsRepos: string[] = [];
  nombresRepos: string[] = [];
  proyecto: number = 0;
  proyectoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    nombreRepo: new FormControl('', [Validators.required]),
    repositorio: new FormControl('', [Validators.required]),
    selectedAllMicroservices: new FormControl(true, [Validators.required]),
    urlsRepositorios: new FormArray([]),
    urlsForm: new FormGroup({
      nombre: new FormControl(''),
      url: new FormControl('')
    }),
    haveDockerfiles: new FormControl(true, [Validators.required]),
    // nameAplication: new FormControl('', [Validators.required, Validators.pattern(this.noTildesPattern)])
  });
  constructor(private router:Router,
    private proyectoService: ProyectoService,
    private authService: AuthService 
  ){}
  ngOnInit(): void {
    console.log("controls",this.urlsRepositorios.controls);
    // console.log("controls2",this.urlsRepositorios.at(0).get('nombre'));
  }
  async crearProyecto(): Promise<void> {
    this.loading = true;
    const nuevoProyecto = this.proyectoForm.value;
    const usuario: Usuario = await this.authService.getUsuario();
    console.log('Usuario en sesión: ' + usuario.id_usuario);  
    this.urlsRepos.push(this.proyectoForm?.get('repositorio')?.value ||'');
    this.nombresRepos.push(this.proyectoForm?.get('nombreRepo')?.value ||'');
    console.log('urls', this.urlsRepos);
    console.log('nombres', this.nombresRepos);
    let data: Proyecto ={};
    if (this.proyectoForm.valid) {
      if(nuevoProyecto.selectedAllMicroservices){
          data = {
          nombre: nuevoProyecto.name || '',
          descripcion: nuevoProyecto.description || '',
          url_repositorio: nuevoProyecto.repositorio || '',
          docker_compose: nuevoProyecto.selectedAllMicroservices || false,
          dockerfile: nuevoProyecto.haveDockerfiles || false,
          fk_usuario: usuario.id_usuario || 0
        }
      }else{
          data = {
          nombre: nuevoProyecto.name || '',
          descripcion: nuevoProyecto.description || '',
          urls_repositorios: this.urlsRepos || [],
          nombres_microservicios: this.nombresRepos || [],
          docker_compose: nuevoProyecto.selectedAllMicroservices || false,
          dockerfile: nuevoProyecto.haveDockerfiles || false,
          fk_usuario: usuario.id_usuario || 0
        }
      }
      console.log('Proyecto a crear', data);
      this.proyectoService.create(data).subscribe({
        next: (res: any) => {
          console.log('Proyecto creado', res);
          this.proyectoService.setProyecto(res);
          Swal.fire({
            title: "Proyecto creado correctamente",
            text: "¿Deseas desplegar el proyecto?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, desplegar",
            cancelButtonText: "No, ver proyectos"
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate([ROUTES_APP.DESPLIEGUES+'/'+ROUTES_APP.CREAR_DESPLIEGUE]);
            }else{
              this.router.navigateByUrl(ROUTES_APP.PROYECTOS);
            }
          });
          
        }, error: (error: any) => {
          console.error('Error creando proyecto', error);
          this.loading = false;
          Swal.fire('Error', 'Ocurrió un error al crear el proyecto', error);
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
    this.inputHabilitado=false;
  }
  addMicro(){
    const nuevoMicro = this.proyectoForm.get('urlsForm') as FormGroup;
    console.log('nuevo Micro', nuevoMicro);
    let nombreMicro = nuevoMicro.get('nombre')?.value;
    let urlMicro = nuevoMicro.get('url')?.value;
    this.nombresRepos.push(nombreMicro);
    this.urlsRepos.push(urlMicro);
    this.inputHabilitado=true;
    console.log('NOMBRES', this.nombresRepos);
    console.log('URLS', this.urlsRepos);
    this.proyectoForm.get('urlsForm')?.reset();
  }
  deleteUrl(index:number) {
    this.urlsRepositorios.removeAt(index);
    this.nombresRepos.splice(index,1);
    this.urlsRepos.splice(index,1);
    console.log('NOMBRES', this.nombresRepos);
    console.log('URLS', this.urlsRepos);
    this.inputHabilitado=true;
  }
  goBack(): void{
    this.router.navigateByUrl(ROUTES_APP.PROYECTOS);
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
