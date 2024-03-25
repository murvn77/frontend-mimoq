import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService  } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent {
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) {}

  redirectToPrincipal() {
    this.router.navigateByUrl('/');
    this.authService.logout();
    this.isLoggedIn = false;
    console.log(`NAVBAR - PRINCIPAL: ${this.authService.isLoggedIn}`);
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
    console.log(`NAVBAR - LOGIN: ${this.authService.isLoggedIn}`);
  }
}
