import { Injectable } from '@nestjs/common';
import { AC1ResultDTO } from 'src/ac1/dtos';
import { AC1Result, AC1Session } from 'src/ac1/model/';

@Injectable()
export class AC1ResultFactory {
  constructor() {}

  toModel(eventDto: AC1ResultDTO, session: AC1Session): AC1Result {
    return {
      ...eventDto,
      session,
      sessionId: session.sessionId,
    };
  }
}
