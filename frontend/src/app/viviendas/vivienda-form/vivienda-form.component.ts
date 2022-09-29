import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ViviendaImpl } from '../models/vivienda-impl';
import { ViviendaService } from '../service/vivienda.service';

@Component({
  selector: 'app-vivienda-form',
  templateUrl: './vivienda-form.component.html',
  styleUrls: ['./vivienda-form.component.css']
})
export class ViviendaFormComponent{
  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}viviendas`;
  public vivienda : ViviendaImpl = new ViviendaImpl(0,"","","","",0,"",0,0,0,[],"");



  constructor(
    private viviendaService: ViviendaService,
    private http: HttpClient,
    private router: Router,

  ) {
  }





public onSubmit(){
  this.viviendaService.postVivienda(this.vivienda).subscribe(() => {
    this.router.navigate([`/viviendas`]);
    },
    (error) => {
      console.error(error);
    });

}

}
