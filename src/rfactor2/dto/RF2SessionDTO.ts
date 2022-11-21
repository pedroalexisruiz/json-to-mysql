import { RF2DriverDTO } from './RF2Driver';
import { RF2Stream } from './RF2Stream';


export interface RF2SessionDTO {
  DateTime: number;
  TimeString: string;
  Laps: number;
  Minutes: number;
  Stream: RF2Stream;
  Driver?: RF2DriverDTO[];
  MostLapsCompleted: number;
  FormationAndStart?: number;
}
