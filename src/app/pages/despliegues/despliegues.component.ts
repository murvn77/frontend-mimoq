import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectoService } from '../../services/proyecto/proyecto.service';

@Component({
  selector: 'app-despliegues',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './despliegues.component.html',
  styleUrl: './despliegues.component.css'
})
export class DesplieguesComponent implements OnInit {
  p: number = 1;
  microservicios: string[] = [];
  replicas: number = 1;
  nuevovalor = this.replicas;
  indexAnt = 0;
  despliegueForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    replicasMicro: new FormArray([]),
    duracion: new FormControl('', [Validators.required]),
    // replicas: new FormControl(1, [Validators.required]),
    cant_pods: new FormControl('', [Validators.required]),
    namespace: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,
    private proyectoService: ProyectoService
  ) { }
  ngOnInit(): void {
    this.obtenerMicroservicios();

    setTimeout(() => {
      console.log('Microservicios', this.microservicios)
      this.cargarMicroservicios();
      // Tu lógica después del tiempo de espera
      console.log('La espera ha terminado');
    }, 5000);

  }
  get replicasMicro() {
    return this.despliegueForm.get('replicasMicro') as FormArray;
  }
  // get replicas() {
  //   return this.despliegueForm.get('replicas');
  // }
  obtenerMicroservicios() {
    this.proyectoService.findById(2).subscribe(proyecto => {
      this.microservicios = proyecto.nombres_microservicios || [];
      // console.log('Microservicios', this.microservicios);
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
    if(index != this.indexAnt){
      this.indexAnt = index;
      this.nuevovalor = 1;
    }
    const formGroup = this.replicasMicro.at(index);
    console.log('valores', formGroup);
    this.nuevovalor = this.nuevovalor+1;
    console.log('nuevo', this.nuevovalor);
    formGroup.get('cantidad')?.setValue(this.nuevovalor);
    console.log('nuevos', formGroup);
    this.replicasMicro.removeAt(index); // Eliminar el FormGroup antiguo
    this.replicasMicro.insert(index, formGroup);
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
