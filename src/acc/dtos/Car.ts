import { Driver } from './Driver';

export interface Car {
  carId: number;
  raceNumber: number;
  carModel: number;
  cupCategory: number;
  teamName: string;
  nationality: number;
  carGuid: number;
  teamGuid: number;
  drivers: Driver[]; //Uno a muchos, un carro puede ser conducido por varios pero un piloto solo puede manejar un carro
}
