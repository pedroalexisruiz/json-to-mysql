import { RF2LapDTO } from '../dto/RF2Lap';
import { formatTime } from '../util';
import { RF2Driver } from './RF2Driver';
import { RF2Session } from './RF2Session';

export class RF2Car {
  sessionId: number;
  session?: RF2Session;
  SteamID: string;
  driver?: RF2Driver;
  // car attrs
  VehFile: string;
  UpgradeCode: string;
  VehName: string;
  Category: string;
  CarType: string;
  CarClass: string;
  CarNumber: number;
  TeamName: string;
  isPlayer: number;
  GridPos: number;
  Position: number;
  ClassGridPos: number;
  ClassPosition: number;
  Points: number;
  ClassPoints: number;
  LapRankIncludingDiscos: number;
  // is Lap in DTO
  laps: RF2LapDTO[];
  BestLapTime: number;
  formattedBestLapTime?: string;
  // is Laps in DTO
  countLaps: number;
  Pitstops: number;
  FinishStatus: string;
  FinishTime?: number;
  DNFReason?: string;
  gapToFirst?: string;
}
