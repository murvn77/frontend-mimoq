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
export class DashboardComponent implements OnInit {

  iframeHtml: SafeHtml | undefined;
  iframes: string[] = [];
  iframesHtml: SafeHtml[] = [];
  nombres: string[] = []
  iframeString: SafeHtml = '';
  id_experimento: number = 0;
  resultados: boolean = false;
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
  ) { }

  ngOnInit(): void {
    this.iframes = this.experimentoService.getIFrames();

    console.log('IFRAMES DASHBOARD', this.iframes);
    this.iframeString = this.iframes[0][0];
    console.log('IFRAME', this.iframeString)
    this.iframeHtml = this.sanitizer.bypassSecurityTrustHtml(this.iframes[0][0]);
    console.log('sirve', this.iframeHtml)
    for (let i = 0; i < this.iframes.length; i++) {
      const element = this.iframes[i];
      console.log('element', i)
      for (let j = 0; j < element.length; j++) {
        // Marca cada iframe individual como seguro y almacénalo en el array correspondiente
        console.log('prueba', this.iframes[i][j])
        console.log('prueba2', element[j])
        let iframe = element[j]
        let panelID = this.getPanelIdFromIframe(element[j]);
        // Asignar tamaños según el panelId
        let newWidth: string = '450';
        let newHeight: string = '200';
        console.log('ID Panel',panelID);
        if (panelID == '2') {
          newWidth = "800"; // Nuevo ancho para panelId 2
          newHeight = "450";
        }
        // Construir el nuevo iframe con los tamaños modificados
        let newIframe = iframe.replace(`width="${450}"`, `width="${newWidth}"`).replace(`height="${200}"`, `height="${newHeight}"`);
        console.log('nuevo iframe', newIframe)
        this.iframesHtml.push(this.sanitizer.bypassSecurityTrustHtml(newIframe));
        let nombre = this.getNameFromIframe(iframe);
        this.nombres.push(nombre);
        // this.nombres = this.nombres.filter((item, index) => this.nombres.indexOf(item) === index);
        console.log('nombres',this.nombres)
      }
    }

    console.log('htmls reformados', this.iframesHtml)
    this.experimentoCreado();
  }
  experimentoCreado() {
    const data = this.experimentoService.getExperimento();
    console.log('Experimento', data);
    // this.showLoading();
    // this.experimentoService.create(data).subscribe({
    //   next: (res: any) => {
    //     console.log('Experimento creado', res);
        // this.id_experimento = data.id_experimento;
        this.resultados = true;
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
    //   }, error: (error: any) => {
    //     console.error('Error creando el experimento', error);
    //     // this.hideLoading();
    //     // Swal.fire('Error', 'Ocurrió un error al crear el experimento', error);
    //     // this.hideLoading();
    //   }
    //   // console.log(despliegue);
    //   // this.router.navigateByUrl('/despliegues');
    // });
  }

  descargarResultados(){
    console.log('ID_EXPERIMENTO',this.id_experimento);
    this.experimentoService.findFile(this.id_experimento)
    .subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/zip' }); // Creamos un nuevo Blob con el tipo de archivo correcto
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Resultados completos'; // Nombre del archivo que recibimos del servidor
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  getPanelIdFromIframe(iframe: string): string {
    const match = iframe.match(/panelId=(\d+)/);
    return match ? match[1] : ''; // Si match es null, devolver una cadena vacía
  }
  getNameFromIframe(iframe: string): string {
    // Buscar el nombre del servidor en la URL
    let match = iframe.match(/localhost:8080\/d-solo\/([^/]+)\/panelexport/);
    // El primer grupo capturado de la expresión regular es el nombre del servidor
    return match ? match[1] : '';
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
