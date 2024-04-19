import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { DespliegueService } from '../../../services/despliegue/despliegue.service';
import { Router, RouterLink } from '@angular/router';
import { DespliegueInterface } from '../../../core/interfaces/despliegue';
import { ROUTES_APP } from '../../../core/enum/routes.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-despliegues',
  standalone: true,
  imports: [RouterLink,NgxPaginationModule],
  templateUrl: './list-despliegues.component.html',
  styleUrl: './list-despliegues.component.css'
})
export class ListDesplieguesComponent implements OnInit {
  p: number = 1;
  despliegues: DespliegueInterface[] = [];
  constructor(private router: Router, 
    private despliegueService: DespliegueService) {}
  ngOnInit(): void {
      this.despliegueService.findAll().subscribe(despliegues => {
        this.despliegues = despliegues;
        console.log('Despliegues',this.despliegues);
      });
  }
  get ROUTES_APP(){
    return ROUTES_APP;
  }
  desplegar(id: number){
    console.log('Desplegar',id);
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigateByUrl('/despliegues/'+ROUTES_APP.CREAR_DESPLIEGUE)
      } else if (result.isDenied) {
        Swal.fire("Despliegue iniciado", "", "info");
      }
    });
  }
}
