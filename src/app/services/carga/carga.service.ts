import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargaInterface } from '../../core/interfaces/carga';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  nuevaCarga: CargaInterface = {} as CargaInterface;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  private urlBackend: string = 'http://localhost:3000/api/carga/'
  constructor(private httpClient: HttpClient) { }
  
  findAll(): Observable<CargaInterface[]> {
    return this.httpClient.get<CargaInterface[]>(this.urlBackend);
  }
  findById(id: number): Observable<CargaInterface> {
    return this.httpClient.get<CargaInterface>(this.urlBackend + `${id}`);
  }
  public create(proyecto: any): Observable<CargaInterface> {
    return this.httpClient.post<CargaInterface>(this.urlBackend, proyecto, this.httpOptions);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.urlBackend + `${id}`);
  }

  public update(proyecto: any): Observable<CargaInterface> {
    return this.httpClient.put<CargaInterface>(this.urlBackend, proyecto, this.httpOptions);
  }

  setCarga(carga: CargaInterface): void {
    this.nuevaCarga = carga;
  }

  getCarga(): CargaInterface {
    return this.nuevaCarga;
  }
}
