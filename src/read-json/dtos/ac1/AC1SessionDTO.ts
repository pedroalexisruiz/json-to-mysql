import { AC1CarDTO } from './AC1CarDTO';
import { AC1EventDTO } from './AC1EventDTO';
import { AC1LapDTO } from './AC1LapDTO';
import { AC1ResultDTO } from './AC1ResultDTO';

export interface AC1SessionDTO {
  Version: number;
  Cars: AC1CarDTO[];
  Events: AC1EventDTO[];
  Laps: AC1LapDTO[];
  Result: AC1ResultDTO[];
  Penalties: null;
  TrackConfig: string;
  TrackName: string;
  Type: string;
  Date: Date;
  SessionFile: string;
  SessionConfig: SessionConfig;
  ChampionshipID: string;
  RaceWeekendID: string;
}

interface SessionConfig {
  session_type: number;
  name: string;
  time: number;
  laps: number;
  is_open: number;
  wait_time: number;
  visibility_mode: number;
  qualifying_type: number;
  qualifying_number_of_laps_to_average: number;
  count_out_lap: boolean;
  disable_push_to_pass: boolean;
}
