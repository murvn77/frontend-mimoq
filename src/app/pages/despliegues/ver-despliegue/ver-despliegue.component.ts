import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { DespliegueService } from '../../../services/despliegue/despliegue.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DespliegueInterface } from '../../../core/interfaces/despliegue';
import { ROUTES_APP } from '../../../core/enum/routes.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-despliegue',
  standalone: true,
  imports: [RouterLink,NgxPaginationModule],
  templateUrl: './ver-despliegue.component.html',
  styleUrl: './ver-despliegue.component.css'
})
export class VerDespliegueComponent implements OnInit{

  p: number = 1;
  despliegues: DespliegueInterface[] = [];
  // desplieguesOrdenados: DespliegueInterface[] = [];
  // desplieguesAgrupados: DespliegueG[] = [];
  constructor(private router: Router, 
    private despliegueService: DespliegueService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
      // this.despliegueService.findAll().subscribe(despliegues => {
      //   this.despliegues = despliegues;
      //   console.log('Despliegues salen',this.despliegues);
      // });ngOnInit(): void {
    this.getDespliegue(this.route.snapshot.paramMap.get('nombre'));
  }
  getDespliegue(nombre: any): void{
    this.despliegueService.findByNameDeployment(nombre).subscribe({
      next: (proyecto: any) => {
        this.despliegues = proyecto;
        console.log('Despliegues',this.despliegues);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  } 

  get ROUTES_APP(){
    return ROUTES_APP;
  }

  desplegar(despliegue: DespliegueInterface){
    console.log('Desplegar',despliegue);
    Swal.fire({
      title: "¿Quieres editar el despliegue?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      denyButtonColor: "#7E7E7D",
      denyButtonText: `No, desplegar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/despliegues/'+ROUTES_APP.CREAR_DESPLIEGUE)
      } else if (result.isDenied) {
        Swal.fire("Iniciando despliegue", "", "info");
      }
    });
  }
  goBack(): void{
    this.router.navigateByUrl(ROUTES_APP.DESPLIEGUES);
  }
}
