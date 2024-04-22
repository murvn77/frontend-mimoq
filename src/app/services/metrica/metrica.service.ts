import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricaInterface } from '../../core/interfaces/metrica';

@Injectable({
  providedIn: 'root'
})
export class MetricaService {

  private urlBackend: string = 'http://localhost:3000/api/metrica/'

  constructor(private httpClient: HttpClient) { }
  findAll(): Observable<MetricaInterface[]> {
    return this.httpClient.get<MetricaInterface[]>(this.urlBackend);
  }
  findById(nombre: string): Observable<MetricaInterface> {
    return this.httpClient.get<MetricaInterface>(this.urlBackend + `${nombre}`);
  }
}
