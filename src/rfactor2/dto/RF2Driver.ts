import { RF2LapDTO } from './RF2Lap';

export interface RF2DriverDTO {
  Name: string;
  SteamID: number;
  Connected: number;
  VehFile: string;
  UpgradeCode: string;
  VehName: string;
  Category: string;
  CarType: string;
  CarClass: string;
  CarNumber: string;
  TeamName: string;
  isPlayer: number;
  ServerScored: number;
  GridPos: number;
  Position: number;
  ClassGridPos: number;
  ClassPosition: number;
  Points: number;
  ClassPoints: number;
  LapRankIncludingDiscos: number;
  Lap: RF2LapDTO[];
  BestLapTime: number;
  Laps: number;
  Pitstops: number;
  FinishStatus: string;
  FinishTime?:number;
  DNFReason?: string;
  ControlAndAids: RF2ControlAndAid; // indica desde que vuelta un piloto humano tomó el control, no necesario en BD
}

export interface RF2ControlAndAid {
  _: string;
  startLap: number;
  endLap: number;
}
