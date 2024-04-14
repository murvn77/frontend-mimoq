import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLink} from '@angular/router';
import { AuthService  } from '../../services/auth/auth.service';
import { Login } from '../../core/usuario';
import Swal from 'sweetalert2';
import { ROUTES_APP } from '../../core/enum/routes.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  urlBackend: string  = 'http://localhost:3000/api';
  loginObj: Login = {} as Login;

  constructor(private authService: AuthService, private router: Router) {

  }
  get ROUTES_APP(){
    return ROUTES_APP;
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
          Swal.fire('Ingreso', 'Ingreso Exitoso', 'success');
          this.authService.login(data.usuario);
          console.log(`LOGIN - FETCH: ${this.authService.isLoggedIn}`);
          localStorage.setItem('angular17token', data.access_token);
          this.router.navigateByUrl(ROUTES_APP.HOME);
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'Ocurrió un error al ingresar', 'error');
      });
  }
}