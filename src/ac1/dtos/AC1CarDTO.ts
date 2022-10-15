import { AC1DriverDTO } from './AC1DriverDTO';


export interface AC1CarDTO {
  BallastKG: number;
  CarId: number;
  Driver: AC1DriverDTO;
  Model: string;
  Restrictor: number;
  Skin: string;
  ClassID: string;
  MinPing: number;
  MaxPing: number;
}
