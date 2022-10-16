export interface RF2Stream {
  Score: RF2Incident[];
  Sector: RF2Incident[];
  Penalty: RF2Incident[];
  Incident: RF2Incident[];
}

export interface RF2Incident {
  _: string;
  et: number;
}
