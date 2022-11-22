import { Injectable } from '@nestjs/common';
import { RF2IncidentDTO } from '../dto/RF2IncidentDTO';
import { RF2IncidentEntity } from '../entities';
import { RF2Incident } from '../model/RF2Incident';
import { formatTime } from '../util';

@Injectable()
export class RF2IncidentFactory {
  constructor() {}

  parseDTOtoModel(
    incident: RF2IncidentDTO,
    sessionId: number,
  ): RF2IncidentEntity {
    const { _: description, et } = incident;
    return {
      sessionId,
      description,
      time: formatTime(et),
    };
  }

  bulkDTOToModel(
    incidentsDto: RF2IncidentDTO[],
    sessionId: number,
  ): RF2IncidentEntity[] {
    return Array.isArray(incidentsDto)
      ? incidentsDto.map((incidentDto) =>
          this.parseDTOtoModel(incidentDto, sessionId),
        )
      : [this.parseDTOtoModel(incidentsDto as RF2IncidentDTO, sessionId)];
  }
}
