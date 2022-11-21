import { RF2IncidentDTO } from './RF2IncidentDTO';

export interface RF2Stream {
  Score: RF2IncidentDTO[];
  Sector: RF2IncidentDTO[];
  Penalty: RF2IncidentDTO[];
  Incident: RF2IncidentDTO[];
  Sent: RF2IncidentDTO[];
  Chat: RF2IncidentDTO;
}
