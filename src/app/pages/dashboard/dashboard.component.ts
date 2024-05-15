import { Component } from '@angular/core';
import { TooltipDirective } from '../../core/directives/tooltip.directive';
import { ExperimentoService } from '../../services/experimento/experimento.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TooltipDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  // const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => {
  //   new bootstrap.Tooltip(tooltipTriggerEl)
  // })
  // users:any[]=[];
  // constructor(private http: HttpClient) {

  // }
  constructor(private experimentoService: ExperimentoService){}

  ngOnInit(): void {
    // console.log("hola dashboard",
    // this.experimentoService.findFile('tessss','results-tracing-server-0-replica-0.json'));
    // this.experimentoService.findFile('tessss','results-tracing-server-0-replica-0.json')
    // .subscribe((data: Blob) => {
    //   const blob = new Blob([data], { type: 'text/json' }); // Creamos un nuevo Blob con el tipo de archivo correcto
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'results-tracing-server-0-replica-0.json'; // Nombre del archivo que recibimos del servidor
    //   document.body.appendChild(a);
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    // });
  }

  // getAllusers() {
  //   debugger;
  //   this.http.get('https://freeapi.gerasim.in/api/User/GetAllUsers').subscribe((res:any) => {
  //     this.users = res.data;
  //   } , error => {
  //     alert("Error From API")
  //   })
  // }

}
