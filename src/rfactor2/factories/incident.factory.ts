import { Injectable } from '@nestjs/common';
import { RF2IncidentDTO } from '../dto/RF2IncidentDTO';
import { RF2Incident } from '../model/RF2Incident';
import { formatTime } from '../util';

@Injectable()
export class RF2IncidentFactory {
  constructor() {}

  parseDTOtoModel(incident: RF2IncidentDTO, sessionId: number): RF2Incident {
    const { _, et } = incident;
    return new RF2Incident(sessionId, _, formatTime(et));
  }

  bulkDTOToModel(
    incidentsDto: RF2IncidentDTO[],
    sessionId: number,
  ): RF2Incident[] {
    return incidentsDto.map((incidentDto) =>
      this.parseDTOtoModel(incidentDto, sessionId),
    );
  }
}
