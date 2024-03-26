import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService  } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.isLoggedInSubject.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn; // Actualiza la propiedad isLoggedIn cuando cambie el estado de inicio de sesión
    });
  }

  redirectToPrincipal() {
    this.router.navigate(['/']);
    this.authService.logout();
    console.log(`NAVBAR - PRINCIPAL: ${this.authService.isLoggedIn}`);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
    console.log(`NAVBAR - LOGIN: ${this.authService.isLoggedIn}`);
  }
}
