import { RF2Car } from './RF2Car';
import { RF2Incident } from './RF2Incident';

export class RF2Session {
  sessionId?: number;
  fileName: string;
  // qualy, practice or race
  sessionType: string;
  // sacarlo del track course
  trackName: string;
  DateTime: number;
  TimeString: string;
  // en dto es Laps
  countLaps: number;
  fastestLap: number;
  Minutes: number;
  // en DTO es Stream, filtrar solo los incidentes
  incidents: RF2Incident[];
  // en dto es Driver
  Cars?: RF2Car[];
  MostLapsCompleted: number;
  FormationAndStart?: number;
}
