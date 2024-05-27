import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Carga } from '../../../core/model/carga/carga';
import { ExperimentoService } from '../../../services/experimento/experimento.service';
import { DespliegueService } from '../../../services/despliegue/despliegue.service';
import { DespliegueInterface } from '../../../core/interfaces/despliegue';
import { NgxPaginationModule } from 'ngx-pagination';
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
  nombre_despliegue: DespliegueInterface[] = [];
  despliegue: DespliegueInterface = {} as DespliegueInterface;
  ids_despliegues: number[] = []
  inputHabilitado = false;
  // ids_metricas: number[] = [2,3]
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
    // setTimeout(() => {
      console.log('Microservicios', this.despliegues)
      this.cargarMicroservicios();
      console.log('La espera ha terminado');
    // }, 6000);
  }

  get cargas() {
    return this.experimentoForm.get('cargas') as FormArray;
  }

  cargarDespliegues() {
    this.despliegueService.getDespliegue().forEach((despliegue) => {
      if(despliegue.cant_replicas > 0){
        this.despliegues.push(despliegue);
      }
    }
    );
    console.log('Despliegues seleccionados', this.despliegues);
    // this.nombre_despliegue = this.despliegueService.getDespliegue()?[0].nombre_helm || '';
    // console.log('ID id_despliegue', this.nombre_despliegue);
    // this.despliegueService.findByNameDeployment(this.nombre_despliegue[0]?.nombre_helm).subscribe( {
    //   next: (despliegues: any) => {
    //     this.despliegues = despliegues || [];
    //     console.log('Despliegues', this.despliegues);
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   }
    // });
    // this.despliegueService.findAll().subscribe({
    //   next: (despliegues: any) => {
    //     this.despliegues = despliegues || [];
    //     console.log('Despliegues', this.despliegues);
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   }
    // });
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

  // crearCarga() {
  //   const newCarga: Carga = {
  //     cant_usuarios: this.cant_usuarios,
  //     duracion_picos: this.duracion_picos,
  //     duracion_total:
  //   }
  //   this.cargaService.create(newCarga).subscribe({
  //     next: (res: any) => {
  //       console.log('Carga creada', res);
  //       this.carga = res;
  //       console.log('Carga seteada', this.carga);
  //     }, error: (error: any) => {
  //       console.error('Error creando carga', error);
  //     }
  //     // console.log(despliegue);
  //     // this.router.navigateByUrl('/despliegues');
  //   });
  // }

  crearExperimento() {
    this.status = true;
    console.log(this.experimentoForm.value);
    // setTimeout(() => {
    //   this.crearCarga();
    //   console.log('La espera ha terminado');
    // }, 2000);
    const sumatoriaPicos = sumarTiemposPorPosicion(this.duracion_picos);
    console.log('Sumatoria de picos', sumatoriaPicos);
    // if(this.verificarTiempos(sumatoriaPicos)){

    // }
    const newCarga: Carga = {
      cant_usuarios: this.cant_usuarios,
      duracion_picos: this.duracion_picos,
      duracion_total: sumatoriaPicos
    }
    this.showLoading();
    this.cargaService.create(newCarga).subscribe({
      next: (res: any) => {
        console.log('Carga creada', res);
        this.carga = res;
        console.log('Carga seteada', this.carga);
        console.log('Carga crear experimento', this.carga);
        if (this.carga) {
          console.log('Entra al if');
          const nuevoExperimento = this.experimentoForm.value;
          const data: Experimento = {
            nombre: nuevoExperimento.nombre || '',
            duracion: nuevoExperimento.duracion || '',
            cant_replicas: nuevoExperimento.replicas || 0,
            endpoints: this.endpoints,
            fk_ids_despliegues: this.ids_despliegues,
            fk_ids_metricas: [],
            fk_id_carga: this.carga.id_carga
          }
          console.log('Experimento a crear', data);
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
        this.hideLoading();
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
  verificarTiempos(tiempos: number[]): boolean {
    const duracionExperimento = convertirStringAMinutos(this.experimentoForm.get('duracion')?.value as string)
    console.log('Duracion experimento', duracionExperimento);
    let check: boolean = true;
    tiempos.forEach(elemento => {
      if (elemento > duracionExperimento) {
        check = false;
      }
    });
    console.log('Check', check);
    return check;
  }
  showLoading() {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera!',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }
  hideLoading() {
    Swal.close();
  }
}

function convertirTiempoASegundos(tiempo: string): number {
  const unidades: { [key: string]: number } = {
    's': 1 / 60,
    'm': 1,
    'h': 60,
    'd': 1440
  };

  const regex = /(\d+)([smhd])/g;
  let sumaSegundos = 0;

  let match;
  while ((match = regex.exec(tiempo)) !== null) {
    const cantidad = parseInt(match[1]);
    const unidad = match[2];
    sumaSegundos += cantidad * unidades[unidad];
  }

  return sumaSegundos;
}

function sumarTiemposPorPosicion(tiempos: string[]): string[] {
  const sumas: string[] = [];

  tiempos.forEach(elemento => {
    const tiempos = elemento.split(',');
    let sumaTotalSegundos = 0;

    tiempos.forEach(tiempo => {
      sumaTotalSegundos += convertirStringAMinutos(tiempo);
    });

    sumas.push(`${sumaTotalSegundos}m`);
  });

  return sumas;
}

function convertirStringAMinutos(tiempo: string): number {
  const unidades: { [key: string]: number } = {
    's': 1 / 60,
    'm': 1,
    'h': 60,
    'd': 1440
  };

  const regex = /(\d+)([smhd])/;
  const match = tiempo.match(regex);

  if (match) {
    const cantidad = parseInt(match[1]);
    const unidad = match[2];
    return cantidad * unidades[unidad];
  } else {
    // Si el formato no es válido, devolvemos 0
    return 0;
  }

}
