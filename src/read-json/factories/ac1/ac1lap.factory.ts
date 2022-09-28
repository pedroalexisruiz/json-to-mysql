import { Injectable } from '@nestjs/common';
import { AC1LapDTO } from 'src/read-json/dtos/ac1/AC1LapDTO';
import { AC1Lap } from 'src/read-json/model/ac1/AC1Lap';
import { AC1Session } from 'src/read-json/model/ac1/AC1Session';

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
