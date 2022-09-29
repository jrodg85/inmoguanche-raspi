import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ViviendaImpl } from 'src/app/viviendas/models/vivienda-impl';
import { ViviendaService } from 'src/app/viviendas/service/vivienda.service';
import { environment } from 'src/environments/environment';
import { AlquilerImpl } from '../models/alquiler-impl';
import { OfertaImpl } from '../models/oferta-impl';
import { VentaImpl } from '../models/venta-impl';
import { AlquilerService } from '../service/alquiler.service';
import { VentaService } from '../service/venta.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.css']
})
export class CrearOfertaComponent implements OnInit {
  public oferta: OfertaImpl = new OfertaImpl(0,"","");
  private host: string = environment.host;
  public urlEndPoint: string = `${this.host}ofertas`;
  public viviendas: ViviendaImpl[] = [];
  public viviendaSeleccionada: ViviendaImpl= new ViviendaImpl(0,"","","","",0,"",0,0,0,[],"");

  //public empleadoNombre:

  public type: number=0;

  submitted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private viviendaService: ViviendaService,
    private ventaService: VentaService,
    private alquilerService: AlquilerService
  ) {


  }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    console.log(this.type);

    this.viviendaService.getViviendas().subscribe(
      (response) => {
        this.viviendas = this.viviendaService.extraerViviendas(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  public onSubmit(f: NgForm) {

    this.submitted = true;

    const nuevaOfertaEntity = f.value;
    ;
      if (!f.invalid || true) {
        if (this.type == 2) {
          const venta: VentaImpl = new VentaImpl(
            0,
            nuevaOfertaEntity.vivienda,
            '',
            nuevaOfertaEntity.precioDeVenta
          );
          this.ventaService.create(venta).subscribe(
            () => {
              this.router.navigate([`/ofertas`])
            },
            (error: any) => {
              console.error(error);
            }
          );
        } else {
          const alquiler: AlquilerImpl = new AlquilerImpl(
            0,
            nuevaOfertaEntity.vivienda,
            '',
            nuevaOfertaEntity.precioAlquilerMensual,
            nuevaOfertaEntity.mesesFianza
          );
          this.alquilerService.create(alquiler).subscribe(
            () => {
              this.router.navigate([`/ofertas`])
            },
            (error) => {
              console.error(error);
            }
          );
        }
      }

    if (f.invalid) {
      return;
    }

  }

  OnReset(f: NgForm) {
    this.submitted = false;
    f.reset();
  }

  cambiaTipo(event: any) {
    this.viviendaSeleccionada = event.currentTarget.value;
}
}
