import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading = signal<boolean>(false);
  // constructor() { }
  public hide(){
    this.isLoading.set(false);
  }
  public show(){
    this.isLoading.set(true);
  }
}
