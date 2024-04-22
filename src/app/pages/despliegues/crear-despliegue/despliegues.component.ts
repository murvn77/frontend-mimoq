import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { DespliegueService } from '../../../services/despliegue/despliegue.service';
import { Despliegue } from '../../../core/model/despliegue/despliegue';
import Swal from 'sweetalert2';
import { ROUTES_APP } from '../../../core/enum/routes.enum';

@Component({
  selector: 'app-despliegues',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './despliegues.component.html',
  styleUrl: './despliegues.component.css'
})
export class DesplieguesComponent implements OnInit {
  id_proyecto: number = 0;
  p: number = 1;
  microservicios: string[] = [];
  replicas: number = 1;
  listaReplicas: number[] = [];
  nuevovalor = this.replicas;
  indexAnt = 0;
  despliegueForm = new FormGroup({
    // nombre: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9]([-a-z0-9][a-z0-9])?(\.[a-z0-9]([-a-z0-9][a-z0-9])?)*$"), Validators.max(53)]),
    nombre: new FormControl('', [Validators.required, Validators.max(53)]),
    cant_pods: new FormControl(1, [Validators.required]),
    namespace: new FormControl('', [Validators.required]),
    replicasMicro: new FormArray([])
  });

  constructor(private router: Router,
    private proyectoService: ProyectoService,
    private despliegueService: DespliegueService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.getProyecto(this.route.snapshot.paramMap.get('id_proyecto'));
    // this.obtenerMicroservicios();

    setTimeout(() => {
      this.cargarMicroservicios();
      console.log('La espera ha terminado');
    }, 2000);

  }
  get replicasMicro() {
    return this.despliegueForm.get('replicasMicro') as FormArray;
  }
  // get replicas() {
  //   return this.despliegueForm.get('replicas');
  // }
  getProyecto(id: any): void{
    this.id_proyecto = id;
    console.log('ID Proyecto', this.id_proyecto);
    this.proyectoService.findById(id).subscribe({
      next: (proyecto: any) => {
        this.microservicios = proyecto.nombres_microservicios || [];
        console.log(this.microservicios);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  obtenerMicroservicios() {
    
    this.id_proyecto = this.proyectoService.getProyecto()?.id_proyecto || 0;
    console.log('ID Proyecto', this.id_proyecto);
    this.proyectoService.findById(this.id_proyecto).subscribe({
      next: (proyecto: any) => {
        this.microservicios = proyecto.nombres_microservicios || [];
        console.log(this.microservicios);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
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
    if (this.nuevovalor > 1) {
      this.nuevovalor = this.nuevovalor - 1;
      console.log('nuevo', this.nuevovalor);
      formGroup.get('cantidad')?.setValue(this.nuevovalor);
      console.log('nuevos', formGroup);
      this.replicasMicro.removeAt(index); // Eliminar el FormGroup antiguo
      this.replicasMicro.insert(index, formGroup);
    }
  }
  crearDespliegue() {
    console.log(this.despliegueForm.value);
    if (this.despliegueForm.valid) {
      console.log('Entra al if');
      const nuevoDespliegue = this.despliegueForm.value;
      const formArray = this.despliegueForm.get('replicasMicro') as FormArray;
      formArray.controls.forEach(element => {
        const cantidadControl = element?.get('cantidad');
        console.log('cantidadControl', cantidadControl);
        const cantidadValue = cantidadControl?.value; // Valor de la cantidad
        this.listaReplicas.push(cantidadValue);
      });
      const data: Despliegue = {
        nombre_helm: nuevoDespliegue.nombre || '',
        replicas: this.listaReplicas,
        cant_pods: Number(nuevoDespliegue.cant_pods) || 1,
        namespace: nuevoDespliegue.namespace || 'default',
        fk_proyecto: this.id_proyecto
      }
      this.despliegueService.createMultiple(data).subscribe({
        next: (res: any) => {
          console.log('Despliegue creado', res);
          // Swal.fire('Creado', 'Despliegue creado correctamente', 'success');
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
              this.router.navigateByUrl('/experimento');
              // this.router.navigate([ROUTES_APP.DESPLIEGUES+ROUTES_APP.CREAR_DESPLIEGUE,res.id_proyecto]);
            }else{
              this.router.navigateByUrl('/despliegues');
            }
          });
          
        }, error: (error: any) => {
          console.error('Error creando el despliegue', error);
          Swal.fire('Error', 'Ocurrió un error al crear el despliegue', 'error');
        }
        // console.log(despliegue);
        // this.router.navigateByUrl('/despliegues');
      });
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
}
