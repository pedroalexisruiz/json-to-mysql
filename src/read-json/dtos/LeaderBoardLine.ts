import { Timing } from './Timing';
import { Driver } from './Driver';
import { Car } from './Car';

export interface LeaderBoardLine {
  car: Car;
  currentDriver: Driver;
  currentDriverIndex: number;
  timing: Timing; // uno a uno.
  missingMandatoryPitstop: number;
  driverTotalTimes: number[];
}
