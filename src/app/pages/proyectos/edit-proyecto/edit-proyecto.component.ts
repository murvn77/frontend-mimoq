import { Component, OnInit } from '@angular/core';
import { ROUTES_APP } from '../../../core/enum/routes.enum';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { ProyectoInterface } from '../../../core/interfaces/proyecto';

@Component({
  selector: 'app-edit-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-proyecto.component.html',
  styleUrl: './edit-proyecto.component.css'
})
export class EditProyectoComponent implements OnInit {
  noTildesPattern = /^[^\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00FC]+$/;
  options = [
    {label: 'Si', value: 'Si'},
    {label: 'No', value: 'No'}
  ]
  proyectoActual : ProyectoInterface = {} as ProyectoInterface;
  // despliegues: DespliegueInterface[] = {} as DespliegueInterface[];
  proyectoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    repositorio: new FormControl('', [Validators.required]),
    selectedAllMicroservices: new FormControl(true, [Validators.required]),
    urlsRepositorios: new FormArray([]),
    haveDockerfiles: new FormControl(true, [Validators.required]),
    // nameAplication: new FormControl('', [Validators.required, Validators.pattern(this.noTildesPattern)])
  });

  constructor(private router:Router,
    private route: ActivatedRoute,
    private proyectoService: ProyectoService, 
  ){}
  ngOnInit(): void {
    this.getProyecto(this.route.snapshot.paramMap.get('id'));
  }
  getProyecto(id: any): void{
    this.proyectoService.findById(id).subscribe({
      next: (proyecto: any) => {
        this.proyectoActual = proyecto;
        // this.despliegues = this.proyectoActual?.despliegues || [];
        console.log('Despliegues',this.proyectoActual);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
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