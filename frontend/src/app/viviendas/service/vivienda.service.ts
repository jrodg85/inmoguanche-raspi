import { Vivienda } from './../models/vivienda';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { environment } from 'src/environments/environment';
import { ViviendaImpl } from '../models/vivienda-impl';




@Injectable({
  providedIn: 'root'
})
export class ViviendaService {

  _refresh$ = new Subject<void>() ;

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}viviendas`;

  constructor(
  private http: HttpClient,
  private auxService: AuxiliarService) { }

  findById(serviceId: any) :Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${serviceId}`);
  }

  get_refresh$(){
    return this._refresh$
  }




  getViviendas(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
    }

  extraerViviendas(respuestaApi: any): Vivienda[] {
  const viviendas: Vivienda[] = [];
  respuestaApi._embedded.viviendas.forEach((p: any) => {
  viviendas.push(this.mapearVivienda(p));

  });
  return viviendas;
  }

  mapearVivienda(viviendaApi: any): ViviendaImpl {
    const url = viviendaApi._links.self.href;
    const aux = url.split('/');
    const id = parseInt(aux[aux.length-1]);
    return new ViviendaImpl(
      id,
      viviendaApi.propietario,
      viviendaApi.provincia,
      viviendaApi.ciudad,
      viviendaApi.direccion,
      viviendaApi.codigoPostal,
      viviendaApi.idReferenciaCatastral,
      viviendaApi.superficie,
      viviendaApi.habitaciones,
      viviendaApi.banyos,
      viviendaApi.ofertasDeVivienda,
      url)
  }

  create(vivienda: Vivienda): void {
    console.log(`Se ha creado una nueva vivienda: ${JSON.stringify(vivienda)}`);
  }


  postVivienda(vivienda: ViviendaImpl) :Observable<any> {
    return this.http.post<any>(this.urlEndPoint, vivienda);

  }


  deleteVivienda(id: number):Observable<Vivienda> {
    debugger;
    return this.http.delete<Vivienda>(`${this.urlEndPoint}/${id}`).pipe(
      tap(() => {
        this._refresh$.next();
      } )
    )
  }

  update(vivienda: ViviendaImpl, id: number) : Observable<any>  {
    return this.http.put<any>(`${this.urlEndPoint}/${id}`, vivienda)
  }


  patchVivienda(vivienda: ViviendaImpl) {
    return this.http.patch<any>(`${this.urlEndPoint}/${vivienda.idVivienda}`, vivienda);
  }

  getViviendasPagina(pagina: number): Observable<any> {
    return this.auxService.getItemsPorPagina(this.urlEndPoint, pagina);
  }


}
