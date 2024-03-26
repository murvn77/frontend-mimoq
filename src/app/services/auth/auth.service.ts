import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  isLoggedInSubject: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  login() {
    this.isLoggedIn = true;
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.setItem('angular17token', 'null');
    this.isLoggedIn = false;
    this.isLoggedInSubject.next(false);
  }
}
