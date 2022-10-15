import { Injectable } from '@nestjs/common';
import { AC1EventDTO } from 'src/ac1/dtos';
import { AC1Event, AC1Session } from 'src/ac1/model/';

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
