import { RF2SessionConfigDTO } from './RF2SessionConfig';

export interface RF2File {
  rFactorXML: RF2XML;
}

export interface RF2XML {
  version: number;
  RaceResults: RF2SessionConfigDTO;
}
