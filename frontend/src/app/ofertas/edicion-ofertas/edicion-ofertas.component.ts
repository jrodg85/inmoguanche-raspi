import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlquilerImpl } from '../models/alquiler-impl';
import { VentaImpl } from '../models/venta-impl';
import { AlquilerService } from '../service/alquiler.service';
import { VentaService } from '../service/venta.service';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-edicion-ofertas',
  templateUrl: './edicion-ofertas.component.html',
  styleUrls: ['./edicion-ofertas.component.css']
})
export class EdicionOfertasComponent implements OnInit {
  type: number = 0;
  id: number = 0;
  idVivienda: number=0;
  @ViewChild('ofertaForm', { static: false }) ofertaForm: NgForm|undefined;
  aceptar = faCircleCheck;
  volver = faCircleArrowLeft




  constructor(private route: ActivatedRoute,
    private router:Router,
    private ventaService: VentaService,
    private alquilerService: AlquilerService) {

    }



  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.idVivienda = this.route.snapshot.params['idVivienda'];
    this.type = parseInt(this.route.snapshot.params['type']);
    console.log(this.id);
    console.log(this.type);

    if(this.type === 2){


    this.ventaService.findById(this.id).subscribe(
      (service)=>{
        debugger;
        this.ofertaForm?.setValue(service);

        console.log(service);

      },
    (error)=> {
      console.error(error);
    });
    }else{


      this.alquilerService.findById(this.id).subscribe(
        (service)=>{
          debugger;
          this.ofertaForm?.setValue(service);

          ;
          console.log(service);


        },
      (error)=> {
        console.error(error);
      });
    }
  }




  public onSubmit(f: NgForm) {

    const ofertaEntity = f.value;
    if (!f.invalid) {
      if (this.type == 2) {
        const venta: VentaImpl = new VentaImpl(
          this.id,
          ofertaEntity.vivienda,
          ofertaEntity.urlVivienda,
          ofertaEntity.precioDeVenta,
        )

          this.ventaService.update(venta,this.id ).subscribe(
            () => {
              console.log('OK');
              this.goTo();

            },
            (error:any) => {
              console.error(error);
            }
          );
      } else {
        const alquiler: AlquilerImpl = new AlquilerImpl(
          this.id,
          ofertaEntity.vivienda,
          ofertaEntity.urlVivienda,
          ofertaEntity.precioAlquilerMensual,
          ofertaEntity.mesesFianza,

        );
        this.alquilerService.update(alquiler, this.id).subscribe(
          () => {

            console.log('OK');
            this.goTo()

          },
          (error:any) => {
            console.error(error);
          }
        )
      }
    }
  }
public goTo(){
  if(this.idVivienda){
    this.router.navigate([`ofertas/ofertas-vivienda/${this.idVivienda}`]);

  }else
    this.router.navigate(['ofertas']);
}
}



