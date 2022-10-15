import { AC1CarService } from './ac1car.service';
import { AC1DriverService } from './ac1driver.service';
import { AC1EventService } from './ac1event.service';
import { AC1LapService } from './ac1lap.service';
import { AC1ResultService } from './ac1result.service';
import { AC1SessionReaderService } from './ac1session-reader.service';
import { AC1SessionService } from './ac1session.service';

const AC1_SERVICES = [
  AC1CarService,
  AC1DriverService,
  AC1EventService,
  AC1LapService,
  AC1ResultService,
  AC1SessionService,
  AC1SessionReaderService,
];

export {
  AC1CarService,
  AC1DriverService,
  AC1EventService,
  AC1LapService,
  AC1ResultService,
  AC1SessionService,
  AC1SessionReaderService,
  AC1_SERVICES,
};
