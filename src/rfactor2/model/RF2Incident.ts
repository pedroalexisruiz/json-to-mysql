import { RF2Session } from './RF2Session';

export class RF2Incident {
  incidentId?: number;
  sessionId: number;
  session?: RF2Session;
  description: string;
  time: string;

  constructor(
    sessionId: number,
    description: string,
    time: string,
    incidentId?: number,
    session?: RF2Session,
  ) {
    this.sessionId = sessionId;
    this.description = description;
    this.time = time;
    this.incidentId = incidentId;
    this.session = session;
  }
}
