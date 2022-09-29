import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEraser, faEye, faFilePen, faPencil, faTrash, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons';
import { Vivienda } from '../models/vivienda';
import { ViviendaImpl } from '../models/vivienda-impl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vivienda-item',
  templateUrl: './vivienda-item.component.html',
  styleUrls: ['./vivienda-item.component.css']
})
export class ViviendaItemComponent {
  @Input() vivienda: Vivienda = new ViviendaImpl(0,"","","","",0,"",0,0,0,[],"");
  @Output() viviendaSeleccionada = new EventEmitter<Vivienda>();
  @Output() viviendaEliminar = new EventEmitter<ViviendaImpl>();
  @Output() viviendaEditar = new EventEmitter<ViviendaImpl>();





  pencil = faPencil;
  mirar = faEye;
  trash = faTrashCan;
  eraser = faEraser;
  trash2 = faTrash;
  x = faX;
  modificar = faFilePen;
  viviendaService: any;


  constructor(

  ) { }



  public onSubmit() {

  }

  borrarVivienda(vivienda: ViviendaImpl["idVivienda"]): void {
    this.viviendaEliminar.emit(this.vivienda);

}

obtenerVivienda(){
 // return this.ofertasService.getDatosOferta(String.valueOf(this.oferta.tipo));
}


  modificarOferta(oferta: ViviendaImpl): void {
    this.viviendaService.patchOferta(oferta).subscribe();
  }

}
