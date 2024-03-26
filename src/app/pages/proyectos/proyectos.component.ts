import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {
  constructor(private router:Router){}
  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    documentType: new FormControl('', [Validators.required]),
    documentNumber: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    aliases: new FormControl('', [Validators.required])
  });

  addUrl() {
    // this.aliases.push(this.formBuilder.control(''));
  }
  deleteUrl() {
    // this.aliases.push(this.formBuilder.control(''));
  }
}
