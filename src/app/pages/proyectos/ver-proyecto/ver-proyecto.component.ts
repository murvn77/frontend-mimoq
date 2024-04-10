import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../../services/proyecto/proyecto.service';
import { Proyecto } from '../../../core/model/proyecto/proyecto';
import { ROUTES_APP } from '../../../core/enum/routes.enum';

@Component({
  selector: 'app-ver-proyecto',
  standalone: true,
  imports: [],
  templateUrl: './ver-proyecto.component.html',
  styleUrl: './ver-proyecto.component.css'
})
export class VerProyectoComponent implements OnInit {
  proyectoActual : Proyecto = {} as Proyecto;

  constructor(private router: Router, 
    private proyectoService: ProyectoService, 
    private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getProyecto(this.route.snapshot.paramMap.get('id'));
  } 

  getProyecto(id: any): void{
    this.proyectoService.findById(id).subscribe({
      next: (proyecto: any) => {
        this.proyectoActual = proyecto;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
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

  goBack(): void{
    this.router.navigateByUrl(ROUTES_APP.PROYECTOS);
  }
}
