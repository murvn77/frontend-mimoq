import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ROUTES_APP } from '../../core/enum/routes.enum';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  isLoggedInSubject: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router) { }

  login() {
    this.isLoggedIn = true;
    this.isLoggedInSubject.next(true);
  }

  logout() {
    // localStorage.setItem('angular17token', 'null');
    localStorage.removeItem('angular17token');
    this.isLoggedIn = false;
    this.isLoggedInSubject.next(false);
    this.router.navigateByUrl(ROUTES_APP.HOME);
  }
}
