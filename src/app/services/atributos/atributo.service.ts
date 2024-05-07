import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtributoInterface } from '../../core/interfaces/atributo';

@Injectable({
  providedIn: 'root'
})
export class AtributoService {

  private urlBackend: string = 'http://localhost:3000/api/atributo/'

  constructor(private httpClient: HttpClient) { }
  findAll(): Observable<AtributoInterface[]> {
    return this.httpClient.get<AtributoInterface[]>(this.urlBackend);
  }
  findById(nombre: string): Observable<AtributoInterface> {
    return this.httpClient.get<AtributoInterface>(this.urlBackend + `${nombre}`);
  }}
