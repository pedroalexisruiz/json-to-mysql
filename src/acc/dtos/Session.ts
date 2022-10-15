import { LapDto } from './Lap';
import { SessionResultDto } from './SessionResult';

export interface SessionDto {
  sessionType: string;
  trackName: string;
  sessionIndex: number;
  raceWeekendIndex: number;
  metaData: string;
  serverName: string;
  sessionResult: SessionResultDto;
  laps: LapDto[];
}
