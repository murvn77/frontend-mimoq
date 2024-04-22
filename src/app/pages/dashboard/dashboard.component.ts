import { Component } from '@angular/core';
import { TooltipDirective } from '../../core/directives/tooltip.directive';

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
  ngOnInit(): void {
    console.log("hola dashboard");
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
