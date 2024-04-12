import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Proyecto } from '../../core/model/proyecto/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  private urlBackend: string  = 'http://localhost:3000/api/proyecto/'
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.urlBackend); //of convierte a Observable
  }
  findById(id: number): Observable<Proyecto> {
    return this.httpClient.get(this.urlBackend + `${id}`);
  }
  public create(proyecto: any): Observable<Proyecto>{
    return this.httpClient.post<Proyecto>(this.urlBackend, proyecto, this.httpOptions);
  }

  public delete(id: number): Observable<Proyecto>{
    return this.httpClient.delete(this.urlBackend + `${id}`);
  }

  public update(proyecto: any): Observable<Proyecto>{
    return this.httpClient.put<Proyecto>(this.urlBackend, proyecto, this.httpOptions);
  }
}