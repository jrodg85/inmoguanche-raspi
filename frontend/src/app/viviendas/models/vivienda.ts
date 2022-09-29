export interface Vivienda {

  idVivienda: number;
  propietario: string;
  provincia: string;
  ciudad: string;
  direccion: string;
  codigoPostal: number;
  idReferenciaCatastral: string;
  superficie: number;
  habitaciones: number;
  banyos:number;
  ofertasDeVivienda: any[];
  urlVivienda: string;

}
