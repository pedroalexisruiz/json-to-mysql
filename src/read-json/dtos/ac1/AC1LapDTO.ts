
export interface AC1LapDTO {
  BallastKG: number;
  CarId: number;
  CarModel: string;
  Cuts: number;
  DriverGuid: string;
  DriverName: string;
  LapTime: number;
  Restrictor: number;
  Sectors: number[];
  Timestamp: number;
  Tyre: string; //H,M,S
  ContributedToFastestLap: boolean;
}
