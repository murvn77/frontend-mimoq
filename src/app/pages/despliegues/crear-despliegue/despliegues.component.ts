import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { DespliegueService } from '../../../services/despliegue/despliegue.service';
import { Despliegue } from '../../../core/model/despliegue/despliegue';
import Swal from 'sweetalert2';
import { ROUTES_APP } from '../../../core/enum/routes.enum';
import { ProyectoInterface } from '../../../core/interfaces/proyecto';

@Component({
  selector: 'app-despliegues',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './despliegues.component.html',
  styleUrl: './despliegues.component.css'
})
export class DesplieguesComponent implements OnInit {
  id_proyecto: number = 0;
  proyecto: ProyectoInterface = {} as ProyectoInterface;
  p: number = 1;
  microservicios: string[] = [];
  replicas: number = 1;
  loading: boolean = false;
  esMultiple: boolean = false;
  listaReplicas: number[] = [];
  nuevovalor = this.replicas;
  indexAnt = 0;
  despliegueForm = new FormGroup({
    // nombre: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9]([-a-z0-9][a-z0-9])?(\.[a-z0-9]([-a-z0-9][a-z0-9])?)*$"), Validators.max(53)]),
    nombre: new FormControl('', [Validators.required, Validators.max(53)]),
    cant_pods: new FormControl(1, [Validators.required]),
    namespace: new FormControl('', [Validators.required]),
    autoescalado: new FormControl(false, [Validators.required]),
    min_replicas: new FormControl(1),   
    max_replicas: new FormControl(1),
    utilization_cpu: new FormControl(20,[Validators.min(20)]),
    replicasMicro: new FormArray([])
  });

  constructor(private router: Router,
    private proyectoService: ProyectoService,
    private despliegueService: DespliegueService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    // this.getProyecto(this.route.snapshot.paramMap.get('id_proyecto'));
    this.obtenerMicroservicios();

    setTimeout(() => {
      this.cargarMicroservicios();
      console.log('La espera ha terminado');
    }, 2000);

  }
  get replicasMicro() {
    return this.despliegueForm.get('replicasMicro') as FormArray;
  }

  obtenerMicroservicios() {
    this.proyecto = this.proyectoService?.getProyecto();
    console.log('Proyecto', this.proyecto);
    this.microservicios = this.proyecto.nombres_microservicios || [];
    this.id_proyecto = this.proyecto.id_proyecto;
    this.esMultiple = this.proyecto?.docker_compose || false;
    console.log(this.microservicios);
  }
  cargarMicroservicios() {
    this.microservicios.forEach((microservicio) => {
      const formGroup = new FormGroup({
        nombre: new FormControl(microservicio, [Validators.required]),
        cantidad: new FormControl(1, [Validators.required]) // Campo para la cantidad de réplicas
      });
      (this.despliegueForm.get('replicasMicro') as FormArray).push(formGroup);
    });
  }
  increment(index: any) {
    const formGroup = this.replicasMicro.at(index);
    console.log('valores', formGroup);
    this.nuevovalor = formGroup.get('cantidad')?.value;
    this.nuevovalor = this.nuevovalor + 1;
    console.log('nuevo', this.nuevovalor);
    formGroup.get('cantidad')?.setValue(this.nuevovalor);
    console.log('nuevos', formGroup);
    this.replicasMicro.removeAt(index); // Eliminar el FormGroup antiguo
    this.replicasMicro.insert(index, formGroup);
  }
  decrement(index: any) {
    const formGroup = this.replicasMicro.at(index);
    console.log('valores', formGroup);
    this.nuevovalor = formGroup.get('cantidad')?.value;
    console.log('valores', formGroup);
    if (this.nuevovalor > 0) {
      this.nuevovalor = this.nuevovalor - 1;
      console.log('nuevo', this.nuevovalor);
      formGroup.get('cantidad')?.setValue(this.nuevovalor);
      console.log('nuevos', formGroup);
      this.replicasMicro.removeAt(index); // Eliminar el FormGroup antiguo
      this.replicasMicro.insert(index, formGroup);
    }
  }
  crearDespliegue() {
    this.loading = true;
    console.log(this.despliegueForm.value);
    if (this.despliegueForm.valid) {
      console.log('Entra al if');
      const nuevoDespliegue = this.despliegueForm.value;
      const formArray = this.despliegueForm.get('replicasMicro') as FormArray;
      formArray.controls.forEach(element => {
        const cantidadControl = element?.get('cantidad');
        const cantidadValue = cantidadControl?.value; // Valor de la cantidad
        this.listaReplicas.push(cantidadValue);
      });
      const data: Despliegue = {
        nombre_helm: nuevoDespliegue.nombre || '',
        replicas: this.listaReplicas,
        cant_pods: Number(nuevoDespliegue.cant_pods) || 1,
        namespace: nuevoDespliegue.namespace || 'default',
        autoescalado: nuevoDespliegue.autoescalado || false,
        fk_proyecto: this.id_proyecto || 0
      }
      if (data.autoescalado) {
        data.min_replicas = nuevoDespliegue.min_replicas || 0;
        data.max_replicas = nuevoDespliegue.max_replicas || 0;
        data.utilization_cpu = nuevoDespliegue.utilization_cpu || 0;
      }
      console.log('Despliegue a crear', data);
      console.log('es esMultiple', this.esMultiple);
      if (!this.esMultiple) {
        this.despliegueService.createIndividual(data).subscribe({
          next: (res: any) => {
            console.log('Despliegue creado', res);
            this.despliegueService.setDespliegue(res);
            // this.router.navigateByUrl(ROUTES_APP.EXPERIMENTO+'/crear');
            Swal.fire({
              title: "Despliegue creado",
              text: "¿Deseas iniciar un experimento con este despliegue?",
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, experimentar",
              cancelButtonText: "No, ver despliegues"
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl(ROUTES_APP.EXPERIMENTO + '/crear');
              } else {
                this.router.navigateByUrl('/despliegues');
              }
            });
          }, error: (error: any) => {
            console.error('Error creando el despliegue:', error);
            this.loading = false;
            Swal.fire('Error', 'Ocurrió un error al crear el despliegue:', error);
          }
          // console.log(despliegue);
          // this.router.navigateByUrl('/despliegues');
        });
      } else {
        this.showLoading();
        this.despliegueService.createMultiple(data).subscribe({
          next: (res: any) => {
            console.log('Despliegue creado', res);
            if (res) {
              this.despliegueService.setDespliegue(res);
              Swal.fire({
                title: "Despliegue creado",
                text: "¿Deseas iniciar un experimento con este despliegue?",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, experimentar",
                cancelButtonText: "No, ver despliegues"

              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl(ROUTES_APP.EXPERIMENTO + '/crear');
                  // this.router.navigate([ROUTES_APP.DESPLIEGUES+ROUTES_APP.CREAR_DESPLIEGUE,res.id_proyecto]);
                } else {
                  this.router.navigateByUrl('/despliegues');
                }
              });
            }
          }, error: (error: any) => {
            console.error('Error creando el despliegue', error);
            this.loading = false;
            this.hideLoading();
            Swal.fire('Error', 'Ocurrió un error al crear el despliegue:', error);
          }
          // this.router.navigateByUrl('/despliegues');
        });
      }
    }
    // addItem() {
    //   this.microservicios.forEach((microservicio) => {
    //     const item = new FormGroup({
    //       nombre: new FormControl(microservicio, [Validators.required]),
    //       cantidad: new FormControl(0, [Validators.required]) // Campo para la cantidad de réplicas
    //     });
    //     this.replicasMicro.push(item);
    //   });
    // }
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
  goBack(): void {
    this.router.navigateByUrl(ROUTES_APP.PROYECTOS);
  }
}
