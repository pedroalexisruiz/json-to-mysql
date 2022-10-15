import { AC1CarFactory } from './ac1car.factory';
import { AC1EventFactory } from './ac1event.factory';
import { AC1LapFactory } from './ac1lap.factory';
import { AC1ResultFactory } from './ac1result.factory';
import { AC1SessionFactory } from './session.factory';

const AC1_FACTORIES = [
  AC1CarFactory,
  AC1EventFactory,
  AC1LapFactory,
  AC1ResultFactory,
  AC1SessionFactory,
];

export {
  AC1CarFactory,
  AC1EventFactory,
  AC1LapFactory,
  AC1ResultFactory,
  AC1SessionFactory,
  AC1_FACTORIES,
};
