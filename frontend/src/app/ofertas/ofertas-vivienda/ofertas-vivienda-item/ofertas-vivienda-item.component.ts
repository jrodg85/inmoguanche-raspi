import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPencil, faEye, faTrashCan, faEraser, faTrash, faX, faFilePen, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { OfertaImpl } from '../../models/oferta-impl';
import { OfertaService } from '../../service/oferta.service';

@Component({
  selector: 'app-ofertas-vivienda-item',
  templateUrl: './ofertas-vivienda-item.component.html',
  styleUrls: ['./ofertas-vivienda-item.component.css']
})
export class OfertasViviendaItemComponent implements OnInit {
  @Input() oferta: any;
  @Output() ofertaSeleccionada = new EventEmitter<OfertaImpl>();
  @Output() ofertaEliminar = new EventEmitter<OfertaImpl>();
  @Output() ofertaEditar = new EventEmitter<OfertaImpl>();


  pencil = faPencil;
  mirar = faEye;
  trash = faTrashCan;
  eraser = faEraser;
  trash2 = faTrash;
  x = faX;
  modificar = faFilePen;

  constructor(
    private ofertaService: OfertaService

  ) { }

  ngOnInit(): void {


    console.log(this.oferta);

  }

  public onSubmit() {



  }

  borrarOferta(oferta: OfertaImpl["idOferta"]): void {
    //    this.negocioService.deleteNegocio(this.negocioItem.urlNegocio);
    /* if (confirm('Confirme para eliminar')) { */
      this.ofertaEliminar.emit(this.oferta);


    /* } */

  }
  obtenerOferta() {
    this.ofertaSeleccionada.emit(this.oferta);
  }
  modificarOferta(oferta: OfertaImpl): void {
    //this.ofertaService.patchOferta(oferta).subscribe();
    this.ofertaSeleccionada.emit(oferta);
  }
}
