import 'express-session';

declare module 'express-session' {
  interface SessionData {
    isAdmin: boolean;
    carData: {
      marca: string;
      modelo: string;
      anio: number;
      version: string;
      es0km: boolean;
      tieneGNC: boolean;
      tipoSeguro: string;
    };
  }
}