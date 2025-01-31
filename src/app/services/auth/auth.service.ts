import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ROUTES_APP } from '../../core/enum/routes.enum';
import { Usuario } from '../../core/model/usuario/usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  usuarioLogin: Usuario = {} as Usuario;
  isLoggedInSubject: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router) { }

  login(usuario: Usuario) {
    this.isLoggedIn = true;
    this.isLoggedInSubject.next(true);
    this.usuarioLogin = new Usuario(
      usuario.documento,
      usuario.nombre,
      usuario.correo,
      usuario.contrasena,
      usuario.id_usuario || 0,
    );
  }
  getUsuario(): Usuario {
    return this.usuarioLogin;
  }

  verificarSesion(): boolean {
    const token = localStorage.getItem('angular17token');
    const user = this.getUsuario();
    if (Object.keys(user).length == 0) {
      this.logout();
      return false;
    } else if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    // localStorage.setItem('angular17token', 'null');
    localStorage.removeItem('angular17token');
    this.isLoggedIn = false;
    this.isLoggedInSubject.next(false);
    this.usuarioLogin = {} as Usuario;
    this.router.navigateByUrl(ROUTES_APP.HOME);
  }
}
