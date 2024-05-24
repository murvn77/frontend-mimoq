import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Usuario } from '../../core/model/usuario/usuario';
import { UsuarioInterface } from '../../core/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) { }
  private _refresh = new Subject<void>();
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  private urlBackend: string = 'http://localhost:3000/api/usuario/'

  get refresh() {
    return this._refresh;
  }

  public findAll(): Observable<UsuarioInterface[]> {
    return this.httpClient.get<UsuarioInterface[]>(this.urlBackend);
  }
  public findById(id: number): Observable<UsuarioInterface> {
    return this.httpClient.get<UsuarioInterface>(this.urlBackend + `${id}`);
  }

  public create(usuario: any): Observable<UsuarioInterface> {
    return this.httpClient.post<UsuarioInterface>(this.urlBackend, usuario, this.httpOptions)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.urlBackend + `${id}`)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  public update(id: number,usuario: any): Observable<UsuarioInterface> {
    return this.httpClient.put<UsuarioInterface>(this.urlBackend + `${id}`, usuario, this.httpOptions)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  public findByEmail(email: string): Observable<UsuarioInterface> {
    return this.httpClient.get<UsuarioInterface>(this.urlBackend + `correo/${email}`);
  }

  public ressetPassword(id: number, claveActual: string, claveNueva: string): Observable<UsuarioInterface> {
    return this.httpClient.put<UsuarioInterface>(this.urlBackend + `${id}/${claveActual}/${claveNueva}`, this.httpOptions);
  }
}