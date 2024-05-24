import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService  } from '../../services/auth/auth.service';
import { ROUTES_APP } from '../../core/enum/routes.enum';
import { PermissionsDirective } from '../../core/directives/permissions/permissions.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,PermissionsDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  token:any;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.isLoggedInSubject.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn; // Actualiza la propiedad isLoggedIn cuando cambie el estado de inicio de sesión
    });
    this.token = this.authService.verificarSesion();
  }

  redirectToPrincipal() {
    this.router.navigateByUrl(ROUTES_APP.HOME);
    this.authService.logout();
    location.reload();
    console.log(`NAVBAR - PRINCIPAL: ${this.authService.isLoggedIn}`);
    console.log(this.token);
  }

  redirectToLogin() {
    this.router.navigateByUrl(ROUTES_APP.LOGIN);
    console.log(`NAVBAR - LOGIN: ${this.authService.isLoggedIn}`);
    console.log(this.token);
  }

  get ROUTES_APP(){
    return ROUTES_APP;
  }
}
