import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../core/model/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  
  private urlBackend: string  = 'http://localhost:3000/api'
  constructor(private httpClient:HttpClient) { }

  public findAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.urlBackend + `/read`);
  }
  public findById(id: number): Observable<Usuario> {
    return this.httpClient.get(this.urlBackend + `/read/${id}`); 
  }

  public create(usuario: any): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.urlBackend + `/create`, usuario, this.httpOptions);
  }

  public delete(id: number): Observable<Usuario>{
    return this.httpClient.delete(this.urlBackend + `/delete/${id}`);
  }

  public update(usuario: any): Observable<Usuario>{
    return this.httpClient.put<Usuario>(this.urlBackend + `/update`, usuario, this.httpOptions);
  }
}