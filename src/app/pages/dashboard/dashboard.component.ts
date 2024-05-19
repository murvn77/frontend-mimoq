import { Component, OnInit } from '@angular/core';
import { TooltipDirective } from '../../core/directives/tooltip.directive';
import { ExperimentoService } from '../../services/experimento/experimento.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ROUTES_APP } from '../../core/enum/routes.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TooltipDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  iframeHtml: SafeHtml | undefined;
  iframes: string[] = [];
  iframesHtml: SafeHtml[] = [];
  iframeString: SafeHtml = '';
  // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  // const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => {
  //   new bootstrap.Tooltip(tooltipTriggerEl)
  // })
  // users:any[]=[];
  // constructor(private http: HttpClient) {

  // }
  constructor(private experimentoService: ExperimentoService,
    private router: Router,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.iframes = this.experimentoService.getIFrames();

    console.log('IFRAMES DASHBOARD',this.iframes);
    this.iframeString = this.iframes[0][0];
    console.log('IFRAME',this.iframeString)
    this.iframeHtml = this.sanitizer.bypassSecurityTrustHtml(this.iframes[0][0]);
    console.log('sirve',this.iframeHtml)
    for (let i = 0; i < this.iframes.length; i++)  {
      const element = this.iframes[i];
      console.log('element',i)
      for (let j = 0; j < element.length; j++) {
        // Marca cada iframe individual como seguro y almacénalo en el array correspondiente
        console.log('prueba',this.iframes[i][j])
        console.log('prueba2',element[j])
        this.iframesHtml.push(this.sanitizer.bypassSecurityTrustHtml(element[j]));
      }
    }

    console.log('htmls reformados',this.iframesHtml)
    this.crearExperimento();
  }
  crearExperimento() {
    const data = this.experimentoService.getExperimento();
    console.log('Experimento', data);
    // this.showLoading();
    this.experimentoService.create(data).subscribe({
      next: (res: any) => {
        console.log('Experimento creado', res);
        // Swal.fire({
        //   title: "Experimento creado",
        //   text: "El experimento ha sido creado correctamente",
        //   icon: "success",
        //   showCancelButton: true,
        //   confirmButtonColor: "#3085d6",
        //   cancelButtonColor: "#d33",
        //   confirmButtonText: "Ir a dashboard",
        //   cancelButtonText: "Lista de experimentos"
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     this.goToDashboard()
        //   }else{
        //     this.router.navigateByUrl(ROUTES_APP.EXPERIMENTO);
        //   }
        // });
      }, error: (error: any) => {
        console.error('Error creando el experimento', error);
        // this.hideLoading();
        // Swal.fire('Error', 'Ocurrió un error al crear el experimento', error);
        // this.hideLoading();
      }
      // console.log(despliegue);
      // this.router.navigateByUrl('/despliegues');
    });
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
