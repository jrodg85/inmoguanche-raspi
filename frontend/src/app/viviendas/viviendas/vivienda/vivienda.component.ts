import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vivienda } from '../../models/vivienda';
import { ViviendaImpl } from '../../models/vivienda-impl';

@Component({
  selector: 'app-vivienda',
  templateUrl: './vivienda.component.html',
  styleUrls: ['./vivienda.component.css']
})
export class ViviendaComponent{

  @Input() vivienda: Vivienda = new ViviendaImpl(0,"","","","",0,"",0,0,0,[],"");
	@Output() viviendaEliminar = new EventEmitter<Vivienda>()
  constructor() { }


  eliminar(): void {


    this.viviendaEliminar.emit(this.vivienda);
  }
}
