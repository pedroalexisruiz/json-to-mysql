import { RF2Driver } from './RF2Driver';
import { RF2Stream } from './RF2Stream';

export interface RF2SessionConfig {
  Setting: string;
  ServerName: string;
  ClientFuelVisible: number;
  PlayerFile: string;
  DateTime: number;
  TimeString: string;
  Mod: string;
  Season: string;
  TrackVenue: string;
  TrackCourse: string;
  TrackEvent: string;
  TrackData: string;
  TrackLength: number;
  GameVersion: number;
  Dedicated: number;
  ConnectionType: ConnectionType; //medidas de lag, no necesarias en BD
  RaceLaps: number;
  RaceTime: number;
  MechFailRate: number;
  DamageMult: number;
  FuelMult: number;
  TireMult: number;
  VehiclesAllowed: string;
  ParcFerme: number;
  FixedSetups: number;
  FreeSettings: number;
  FixedUpgrades: number;
  Qualify?: RF2Session;
  Practice1?: RF2Session;
  Race?: RF2Session;
}

export interface RF2Session {
  DateTime: number;
  TimeString: string;
  Laps: number;
  Minutes: number;
  Stream: RF2Stream;
  MostLapsCompleted: number;
  Driver?: RF2Driver[];
  FormationAndStart?: number;
}

export interface ConnectionType {
  _: string;
  upload: number;
  download: number;
}
