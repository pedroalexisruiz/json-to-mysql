import { Injectable } from '@nestjs/common';
import { AC1EventDTO } from 'src/read-json/dtos/ac1/AC1EventDTO';
import { AC1Event } from 'src/read-json/model/ac1/AC1Event';
import { AC1Session } from 'src/read-json/model/ac1/AC1Session';

@Injectable()
export class AC1EventFactory {
  constructor() {}

  toModel(eventDto: AC1EventDTO, session: AC1Session): AC1Event {
    return {
      ...eventDto,
      session,
      sessionId: session.sessionId,
      driverGuid: eventDto.Driver.Guid,
      otherDriverGuid: eventDto.OtherDriver.Guid,
    };
  }
}
