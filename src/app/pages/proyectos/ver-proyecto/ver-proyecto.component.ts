import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { Proyecto } from '../../../core/model/proyecto/proyecto';
import { ROUTES_APP } from '../../../core/enum/routes.enum';
import { NgxPaginationModule } from 'ngx-pagination';
import { DespliegueInterface } from '../../../core/interfaces/despliegue';
import { ProyectoInterface } from '../../../core/interfaces/proyecto';
@Component({
  selector: 'app-ver-proyecto',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './ver-proyecto.component.html',
  styleUrl: './ver-proyecto.component.css'
})
export class VerProyectoComponent implements OnInit {
  @Input() id_proyecto: number = 0;
  proyectoActual : ProyectoInterface = {} as ProyectoInterface;
  despliegues: DespliegueInterface[] = {} as DespliegueInterface[];
  p: number = 1;
  constructor(private router: Router, 
    private proyectoService: ProyectoService, 
    private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getProyecto(this.route.snapshot.paramMap.get('id'));
    // this.getProyecto(this.id_proyecto);
  } 

  getProyecto(id: any): void{
    this.proyectoService.findById(id).subscribe({
      next: (proyecto: any) => {
        this.proyectoActual = proyecto;
        this.despliegues = this.proyectoActual?.despliegues || [];
        console.log('Despliegues',this.proyectoActual);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    // this.proyectoActual = this.proyectoService.getProyecto();
    // console.log('Proyecto',this.proyectoActual);  
    // this.despliegues = this.proyectoActual?.despliegues || [];
  }
  update(proyecto: Proyecto): void{
    this.proyectoService.update(proyecto).subscribe(
      res => {
        this.router.navigateByUrl(ROUTES_APP.PROYECTOS);
      },
      error => {
        console.log(error);
      }
    );
  }

  crearDespliegue(){
      console.log("verProyecto",this.proyectoActual);
      this.proyectoService.setProyecto(this.proyectoActual);
      this.router.navigate([ROUTES_APP.DESPLIEGUES+'/'+ROUTES_APP.CREAR_DESPLIEGUE]);
  }
  goBack(): void{
    this.router.navigateByUrl(ROUTES_APP.PROYECTOS);
  }
}
