import { RF2CarFactory } from './car.factory';
import { RF2DriverFactory } from './driver.factory';
import { RF2IncidentFactory } from './incident.factory';
import { RF2LapFactory } from './lap.factory';
import { RF2SessionFactory } from './session.factory';

const RF2_FACTORIES = [
  RF2CarFactory,
  RF2DriverFactory,
  RF2IncidentFactory,
  RF2LapFactory,
  RF2SessionFactory,
];

export {
  RF2CarFactory,
  RF2DriverFactory,
  RF2IncidentFactory,
  RF2LapFactory,
  RF2SessionFactory,
  RF2_FACTORIES,
};
