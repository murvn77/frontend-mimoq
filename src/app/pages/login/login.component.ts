import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService  } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  urlBackend: string;
  loginObj: Login;

  constructor(private authService: AuthService, private router: Router) {
    this.loginObj = new Login();
    this.urlBackend = 'http://localhost:3000/api';
  }

  onLogin() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.loginObj)
    };

    fetch(`${this.urlBackend}/auth/login`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.usuario) {
          alert("Login Success");
          this.authService.login();
          console.log(`LOGIN - FETCH: ${this.authService.isLoggedIn}`);
          localStorage.setItem('angular17token', data.access_token);
          this.router.navigateByUrl('/dashboard');
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
export class Login {
  correo: string;
  contrasena: string;
  constructor() {
    this.correo = '';
    this.contrasena = '';
  }
}
