export interface RF2Stream {
  Score: RF2IncidentDTO[];
  Sector: RF2IncidentDTO[];
  Penalty: RF2IncidentDTO[];
  Incident: RF2IncidentDTO[];
  Sent: RF2IncidentDTO[];
  Chat: RF2IncidentDTO;
}

export interface RF2IncidentDTO {
  _: string;
  et: number;
}
