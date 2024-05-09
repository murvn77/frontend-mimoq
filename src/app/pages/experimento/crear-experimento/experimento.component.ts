import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Carga } from '../../../core/model/carga/carga';
import { ExperimentoService } from '../../../services/experimento/experimento.service';
import { DespliegueService } from '../../../services/despliegue/despliegue.service';
import { DespliegueInterface } from '../../../core/interfaces/despliegue';
import { NgxPaginationModule } from 'ngx-pagination';
import { flush } from '@angular/core/testing';
import { Experimento } from '../../../core/model/experimento/experimento';
import Swal from 'sweetalert2';
import { CargaService } from '../../../services/carga/carga.service';
import { CargaInterface } from '../../../core/interfaces/carga';

@Component({
  selector: 'app-experimento',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgxPaginationModule],
  templateUrl: './experimento.component.html',
  styleUrl: './experimento.component.css'
})
export class ExperimentoComponent implements OnInit {
  p: number = 1;
  nombre_despliegue: string = '';
  despliegue: DespliegueInterface = {} as DespliegueInterface;
  ids_despliegues: number[] = []
  inputHabilitado = false;
  ids_metricas: number[] = [2,3]
  carga: CargaInterface = {} as CargaInterface;
  cant_usuarios: string[] = [];
  duracion_picos: string[] = [];
  despliegues: DespliegueInterface[] = [];
  endpoints: string[] = [];
  status: boolean = false;

  experimentoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    duracion: new FormControl('', [Validators.required]),
    replicas: new FormControl(1, [Validators.required]),
    cargaForm: new FormGroup({
      despliegue: new FormControl(''),
      endpoints: new FormControl('', [Validators.required]),
      vus: new FormControl('', [Validators.required, Validators.pattern("^\\d+(,\\d+)*$")]),
      picos: new FormControl('', [Validators.required, Validators.pattern("^\\d+[sm](,\\d+[sm])*$")])
    }, [Validators.required]),
    cargas: new FormArray([])
  });

  constructor(private router: Router,
    private experimentoService: ExperimentoService,
    private cargaService: CargaService,
    private despliegueService: DespliegueService) { }

  ngOnInit(): void {
    this.cargarDespliegues();
    setTimeout(() => {
      // console.log('Microservicios', this.microservicios)
      this.cargarMicroservicios();
      console.log('La espera ha terminado');
    }, 6000);
  }

  get cargas() {
    return this.experimentoForm.get('cargas') as FormArray;
  }

  cargarDespliegues() {
    this.nombre_despliegue = this.despliegueService.getDespliegue()?.nombre || '';
    console.log('ID id_despliegue', this.nombre_despliegue);
    // this.despliegueService.findByNameDeployment(this.nombre_despliegue).subscribe( {
    //   next: (despliegues: any) => {
    //     this.despliegues = despliegues || [];
    //     console.log('Despliegues', this.despliegues);
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   }
    // });
    this.despliegueService.findAll().subscribe({
      next: (despliegues: any) => {
        this.despliegues = despliegues || [];
        console.log('Despliegues', this.despliegues);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  cargarMicroservicios() {
    this.despliegues.forEach((despliegue) => {
      const cargaForm = new FormGroup({
        despliegue: new FormControl(despliegue, [Validators.required])
        // endpoints: new FormControl('', [Validators.required]),
        // vus: new FormControl('', [Validators.required]),
        // picos: new FormControl('', [Validators.required])
      });
      (this.experimentoForm.get('cargas') as FormArray).push(cargaForm);
    });
  }

  crearCarga(){
    const newCarga: Carga = {
      cant_usuarios: this.cant_usuarios,
      duracion_picos: this.duracion_picos
    }
    this.cargaService.create(newCarga).subscribe({
      next: (res: any) => {
        console.log('Carga creada', res);
        this.carga = res;
        console.log('Carga seteada', this.carga);
      }, error: (error: any) => {
        console.error('Error creando carga', error);
      }
      // console.log(despliegue);
      // this.router.navigateByUrl('/despliegues');
    });
  }

  crearExperimento() {
    this.status = true;
    console.log(this.experimentoForm.value);
    // setTimeout(() => {
    //   this.crearCarga();
    //   console.log('La espera ha terminado');
    // }, 2000);
    const newCarga: Carga = {
      cant_usuarios: this.cant_usuarios,
      duracion_picos: this.duracion_picos
    }
    this.cargaService.create(newCarga).subscribe({
      next: (res: any) => {
        console.log('Carga creada', res);
        this.carga = res;
        console.log('Carga seteada', this.carga);
        console.log('Carga crear experimento', this.carga);
    if(this.carga){
    console.log('Entra al if');
    const nuevoExperimento = this.experimentoForm.value;
    const data: Experimento = {
      duracion: nuevoExperimento.duracion || '',
      cant_replicas: nuevoExperimento.replicas || 0,
      endpoints: this.endpoints,
      fk_ids_despliegues: this.ids_despliegues,
      fk_ids_metricas: this.ids_metricas,
      fk_id_carga: this.carga.id_carga
    }
    console.log('Experimento a crear',data);
    this.experimentoService.setExperimento(data);
    Swal.fire({
      title: "Experimento creado",
      text: "¿Deseas seleccionar métricas para este experimento?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No, ver experimentos"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/metricas');
        // this.router.navigate([ROUTES_APP.DESPLIEGUES+ROUTES_APP.CREAR_DESPLIEGUE,res.id_proyecto]);
      } else {
        this.router.navigateByUrl('/despliegues');
      }
    });
    // this.experimentoService.create(data).subscribe({
    //   next: (res: any) => {
    //     console.log('Experimento creado', res);
    //     Swal.fire({
    //       title: "Experimento creado",
    //       text: "¿Deseas seleccionar metricas para este experimento?",
    //       icon: "success",
    //       showCancelButton: true,
    //       confirmButtonColor: "#3085d6",
    //       cancelButtonColor: "#d33",
    //       confirmButtonText: "Si",
    //       cancelButtonText: "No, ver experimentos"
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         this.router.navigateByUrl('/metricas');
    //         // this.router.navigate([ROUTES_APP.DESPLIEGUES+ROUTES_APP.CREAR_DESPLIEGUE,res.id_proyecto]);
    //       } else {
    //         this.router.navigateByUrl('/despliegues');
    //       }
    //     });

    //   }, error: (error: any) => {
    //     console.error('Error creando el experimento', error);
    //     Swal.fire('Error', 'Ocurrió un error al crear el experimento', 'error');
    //   }
    //   // console.log(despliegue);
    //   // this.router.navigateByUrl('/despliegues');
    // });
  }
      }, error: (error: any) => {
        console.error('Error creando carga', error);
      }
      // console.log(despliegue);
      // this.router.navigateByUrl('/despliegues');
    });
  }
  incluir(index: any) {
    const formGroup = this.cargas.at(index);
    this.despliegue = formGroup.get('despliegue')?.value;
    console.log('despliegue', this.despliegue);
    const nuevaCarga = this.experimentoForm.get('cargaForm') as FormGroup;
    console.log('nueva carga', nuevaCarga);
    let endpoint = nuevaCarga.get('endpoints')?.value;
    let users = nuevaCarga.get('vus')?.value;
    let picos = nuevaCarga.get('picos')?.value;
    console.log(this.experimentoForm.value);
    this.ids_despliegues.push(this.despliegue.id_despliegue);
    this.endpoints.push(endpoint);
    this.cant_usuarios.push(users);
    this.duracion_picos.push(picos);
    console.log('ENDPOINTS', this.endpoints);
    console.log('UsUARIO', this.cant_usuarios);
    console.log('PICOS', this.duracion_picos);
    // this.experimentoForm.get('cargaForm')?.get('vus')?.valueChanges.subscribe((value) => {
    // if(this.experimentoForm.get('cargaForm')?.get('vus')?.value != ''){
    //   this.experimentoForm.get('cargaForm')?.get('vus')?.disable();
    // }
    // })
    // this.endpointsChanged(index);
    this.experimentoForm.get('cargaForm')?.reset();
    console.log('value form', this.experimentoForm.get('cargaForm')?.value);
    // if(this.experimentoForm.get('cargaForm')?.get('vus')?.value === ''){
    //   this.experimentoForm.get('cargaForm')?.get('vus')?.enable();
    // }
  }

  modificar(index: any) {
    // this.inputHabilitado=true;
    // this.cargas.at(index).setValue()
  }
}