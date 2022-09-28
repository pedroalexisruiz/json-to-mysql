import { Injectable } from '@nestjs/common';
import { AC1ResultDTO } from 'src/read-json/dtos/ac1/AC1ResultDTO';
import { AC1Result } from 'src/read-json/model/ac1/AC1Result';
import { AC1Session } from 'src/read-json/model/ac1/AC1Session';

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
