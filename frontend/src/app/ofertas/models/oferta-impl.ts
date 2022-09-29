export class OfertaImpl {
  idOferta: number;
  tipo: number;
  urlOferta: string;
  vivienda: string;


  constructor (idOferta:number, vivienda: string , urlOferta: string){
    this.idOferta = idOferta;
    this.vivienda = vivienda;
    this.urlOferta=urlOferta;
    this.tipo = 0;
  }
  getIdOferta(urlOferta: string): string {
    return urlOferta.slice(urlOferta.lastIndexOf('/') + 1, urlOferta.length);
  }

}
//done
