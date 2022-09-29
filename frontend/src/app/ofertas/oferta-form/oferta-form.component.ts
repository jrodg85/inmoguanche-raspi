import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleArrowLeft, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ViviendaImpl } from 'src/app/viviendas/models/vivienda-impl';
import { ViviendaService } from 'src/app/viviendas/service/vivienda.service';
import { environment } from 'src/environments/environment';
import { AlquilerImpl } from '../models/alquiler-impl';
import { OfertaImpl } from '../models/oferta-impl';
import { VentaImpl } from '../models/venta-impl';
import { AlquilerService } from '../service/alquiler.service';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.css']
})
export class OfertaFormComponent implements OnInit {

  public oferta: OfertaImpl = new OfertaImpl(0,"","");
  private host: string = environment.host;
  public urlEndPoint: string = `${this.host}ofertas`;
  type: string = '';
  idVivienda: number=0;
  public viviendaSeleccionada: ViviendaImpl= new ViviendaImpl(0,"","","","",0,"",0,0,0,[],"");
  aceptar = faCircleCheck;
  volver = faCircleArrowLeft;
  borrar = faCircleXmark;


  //public empleadoNombre:

  submitted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viviendaService: ViviendaService,
    private ventaService: VentaService,
    private alquilerService: AlquilerService
  ) {


  }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.idVivienda = this.route.snapshot.params['idVivienda'];

    console.log(this.type);
 ;
    if(this.idVivienda){
      this.viviendaService.findById(this.idVivienda).subscribe(
        (response) => {
          this.viviendaSeleccionada = this.viviendaService.mapearVivienda(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  public onSubmit(f: NgForm) {
     ;

    this.submitted = true;

    const ofertaEntity = f.value;
      if (!f.invalid ) {
        if (this.type === '2') {
          const venta: VentaImpl = new VentaImpl(
            0,
            this.viviendaSeleccionada.urlVivienda,
            '',
            ofertaEntity.precioDeVenta
          );
           ;
          this.ventaService.create(venta).subscribe(
            () => {
              this.router.navigate([`/ofertas/ofertas-vivienda/${this.viviendaSeleccionada.idVivienda}`]);
            },
            (error: any) => {
              console.error(error);
            }
          );
        } else {
          const alquiler: AlquilerImpl = new AlquilerImpl(
            0,
            this.viviendaSeleccionada.urlVivienda,
            '',
            ofertaEntity.precioAlquilerMensual,
            ofertaEntity.mesesFianza,
          );
           ;
          this.alquilerService.create(alquiler).subscribe(
            () => {
            this.router.navigate([`/ofertas/ofertas-vivienda/${this.viviendaSeleccionada.idVivienda}`]);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      }
   /*  } */

    //se para aqui si el formulario es invalido
    if (f.invalid) {
      return;
    }
    //display si hay exito
   /*  alert(
      'GUARDADO CON EXITO' +
      JSON.stringify(this.analiticaForm.value, null, 4)
    ); */

  }

  OnReset(f: NgForm) {
    this.submitted = false;
    f.reset();
  }


  cambiaViviendaSeleccionada(event: any) {
    this.viviendaSeleccionada = event.currentTarget.value;
}

onBack(){
  this.router.navigate([`/ofertas/ofertas-vivienda/${this.viviendaSeleccionada.idVivienda}`]);
}
}

