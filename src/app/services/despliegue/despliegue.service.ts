import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Despliegue } from '../../core/interfaces/despliegue';

@Injectable({
  providedIn: 'root'
})
export class DespliegueService {

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  private urlBackend: string  = 'http://localhost:3000/api/despliegue/'
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Despliegue[]> {
    return this.httpClient.get<Despliegue[]>(this.urlBackend);
  }
  findById(id: number): Observable<Despliegue> {
    return this.httpClient.get<Despliegue>(this.urlBackend + `${id}`);
  }
  public create(proyecto: any): Observable<Despliegue>{
    return this.httpClient.post<Despliegue>(this.urlBackend, proyecto, this.httpOptions);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete(this.urlBackend + `${id}`);
  }

  public update(proyecto: any): Observable<Despliegue>{
    return this.httpClient.put<Despliegue>(this.urlBackend, proyecto, this.httpOptions);
  }
}
