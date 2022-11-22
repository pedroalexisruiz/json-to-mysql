import { RF2CarService } from './rf2car.service';
import { RF2IncidentService } from './rf2incident.service';
import { RF2SessionService } from './rf2session.service';

const RF2_SERVICES = [RF2SessionService, RF2IncidentService, RF2CarService];

export { RF2SessionService, RF2IncidentService, RF2CarService, RF2_SERVICES };
