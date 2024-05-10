import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../core/model/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  private urlBackend: string = 'http://localhost:3000/api/usuario/'

  public findAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.urlBackend);
  }
  public findById(id: number): Observable<any> {
    return this.httpClient.get(this.urlBackend + `${id}`);
  }

  public create(usuario: any): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.urlBackend, usuario, this.httpOptions);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.urlBackend + `${id}`);
  }

  public update(usuario: any): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.urlBackend, usuario, this.httpOptions);
  }

  public findByEmail(email: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.urlBackend + `correo/${email}`);
  }

  public ressetPassword(id: number, claveActual: string, claveNueva: string): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.urlBackend + `${id}/${claveActual}/${claveNueva}`, this.httpOptions);
  }
}