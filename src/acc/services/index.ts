import { CarService } from './car.service';
import { DriverService } from './driver.service';
import { LapService } from './lap.service';
import { ReadJsonService } from './read-json.service';
import { SessionService } from './session.service';
import { SessionResultService } from './session-result.service';

const ACC_SERVICES = [
  CarService,
  DriverService,
  LapService,
  ReadJsonService,
  SessionService,
  SessionResultService,
];

export {
  CarService,
  DriverService,
  LapService,
  ReadJsonService,
  SessionService,
  SessionResultService,
  ACC_SERVICES,
};
