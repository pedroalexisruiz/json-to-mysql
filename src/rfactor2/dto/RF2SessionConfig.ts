import { RF2SessionDTO } from './RF2SessionDTO';

export interface RF2SessionConfigDTO {
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
  Qualify?: RF2SessionDTO;
  Practice1?: RF2SessionDTO;
  Race?: RF2SessionDTO;
}

export interface ConnectionType {
  _: string;
  upload: number;
  download: number;
}
