import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, tap } from 'rxjs';
import { Proyecto } from '../../core/model/proyecto/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  nuevoProyecto: Proyecto = {} as Proyecto;
  private _refresh = new Subject<void>();
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  private urlBackend: string = 'http://localhost:3000/api/proyecto/'
  constructor(private httpClient: HttpClient) { }

  get refresh() {
    return this._refresh;
  }

  findAll(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.urlBackend); //of convierte a Observable
  }
  findById(id: number): Observable<Proyecto> {
    return this.httpClient.get(this.urlBackend + `${id}`);
  }
  public create(proyecto: any): Observable<Proyecto> {
    return this.httpClient.post<Proyecto>(this.urlBackend, proyecto, this.httpOptions)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  public delete(id: number): Observable<Proyecto> {
    return this.httpClient.delete(this.urlBackend + `${id}`)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    );;
  }

  public update(proyecto: any): Observable<Proyecto> {
    return this.httpClient.put<Proyecto>(this.urlBackend, proyecto, this.httpOptions);
  }

  setProyecto(proyecto: Proyecto): void {
    this.nuevoProyecto = proyecto;
  }
  getProyecto(): Proyecto {
    return this.nuevoProyecto;
  }
}