import { Driver } from "./Driver";


export interface Car {
  carId: number;
  raceNumber: number;
  carModel: number;
  cupCategory: number;
  teamName: string;
  nationality: number;
  carGuid: number;
  teamGuid: number;
  drivers: Driver[];
}
