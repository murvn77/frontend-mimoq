import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { DespliegueService } from '../../../services/despliegue/despliegue.service';
import { Router, RouterLink } from '@angular/router';
import { ROUTES_APP } from '../../../core/enum/routes.enum';
import Swal from 'sweetalert2';
import { DespliegueG } from '../../../core/interfaces/despliegue-g';

@Component({
  selector: 'app-list-despliegues',
  standalone: true,
  imports: [RouterLink,NgxPaginationModule],
  templateUrl: './list-despliegues.component.html',
  styleUrl: './list-despliegues.component.css'
})
export class ListDesplieguesComponent implements OnInit {
  p: number = 1;
  // despliegues: DespliegueInterface[] = [];
  desplieguesAgrupados: DespliegueG[] = [];
  constructor(private router: Router,
    private despliegueService: DespliegueService) {}
  ngOnInit(): void {
      this.despliegueService.findAll().subscribe(despliegues => {
        console.log('Despliegues llegan',despliegues);
        despliegues.forEach(despliegue => {
          const despliegueTemp: DespliegueG = {} as DespliegueG;
          const index = this.desplieguesAgrupados.findIndex(item => item.nombre_helm === despliegue.nombre_helm);
          despliegueTemp.despliegues = [despliegue];
          if (index === -1) {
            despliegueTemp.nombre_helm = despliegue.nombre_helm;
            despliegueTemp.namespace = despliegue.namespace;
            despliegueTemp.cant_pods = despliegue.cant_pods;
              this.desplieguesAgrupados.push(despliegueTemp); //
          } else {
              this.desplieguesAgrupados[index]?.despliegues?.push(despliegue) ?? [];
          }
        })
        console.log('Despliegues salen',this.desplieguesAgrupados);
      });
  }
  get ROUTES_APP(){
    return ROUTES_APP;
  }
  desplegar(despliegue: DespliegueG){
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigateByUrl('/despliegues/'+ROUTES_APP.CREAR_DESPLIEGUE)
      } else if (result.isDenied) {
        Swal.fire("Iniciando despliegue", "", "info");
      }
    });
  }
}
