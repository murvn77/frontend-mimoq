import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DespliegueInterface } from '../../core/interfaces/despliegue';

@Injectable({
  providedIn: 'root'
})
export class DespliegueService {

  nuevoDespliegue: DespliegueInterface[] = []
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  private urlBackend: string = 'http://localhost:3000/api/despliegue/'
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<DespliegueInterface[]> {
    return this.httpClient.get<DespliegueInterface[]>(this.urlBackend);
  }
  findById(id: number): Observable<DespliegueInterface> {
    return this.httpClient.get<DespliegueInterface>(this.urlBackend + `${id}`);
  }
  findByNameDeployment(nombre: string): Observable<DespliegueInterface[]> {
    return this.httpClient.get<DespliegueInterface[]>(this.urlBackend + `nombreHelm/${nombre}`);
  }
  public createMultiple(proyecto: any): Observable<DespliegueInterface> {
    return this.httpClient.post<DespliegueInterface>(this.urlBackend + 'multiple', proyecto, this.httpOptions);
  }
  public createIndividual(proyecto: any): Observable<DespliegueInterface> {
    return this.httpClient.post<DespliegueInterface>(this.urlBackend + 'individual', proyecto, this.httpOptions);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.urlBackend + `${id}`);
  }

  public update(proyecto: any): Observable<DespliegueInterface> {
    return this.httpClient.put<DespliegueInterface>(this.urlBackend, proyecto, this.httpOptions);
  }

  setDespliegues(despliegue: DespliegueInterface[]): void {
    this.nuevoDespliegue = despliegue;
  }

  getDespliegues(): DespliegueInterface[] {
    return this.nuevoDespliegue;
  }

  setDespliegue(despliegue: DespliegueInterface[]): void {
    this.nuevoDespliegue = despliegue;
  }

  getDespliegue(): DespliegueInterface[] {
    return this.nuevoDespliegue;
  }
}
