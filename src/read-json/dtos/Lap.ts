export interface LapDto {
  carId: number;
  driverIndex: number;
  laptime: number;
  isValidForBest: boolean;
  splits: number[]; // tiempos por sector
}
