import { Injectable } from '@nestjs/common';
import { AC1LapDTO } from 'src/ac1/dtos';
import { AC1Lap, AC1Session } from 'src/ac1/model/';

@Injectable()
export class AC1LapFactory {
  constructor() {}

  toModel(eventDto: AC1LapDTO, session: AC1Session, lapNumber: number): AC1Lap {
    return {
      ...eventDto,
      session,
      sessionId: session.sessionId,
      lapNumber,
      Sectors: eventDto.Sectors.toString(),
    };
  }
}
