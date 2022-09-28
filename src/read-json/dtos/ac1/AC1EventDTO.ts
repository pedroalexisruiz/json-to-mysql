import { AC1DriverDTO } from './AC1DriverDTO';

export interface AC1EventDTO {
  CarId: number;
  Driver: AC1DriverDTO;
  ImpactSpeed: number;
  OtherCarId: number;
  OtherDriver: AC1DriverDTO;
  RelPosition: Position;
  Type: string; // COLLISION_WITH_CAR, COLLISION_WITH_ENV
  WorldPosition: Position;
  Timestamp: number;
  AfterSessionEnd: boolean;
}

interface Position {
  X: number;
  Y: number;
  Z: number;
}
