import { Injectable } from '@nestjs/common';
import { SessionDto } from '../dtos/Session';
import { Session } from '../model/Session';

@Injectable()
export class SessionFactory {
  constructor() {}

  toModel(sessionDto: SessionDto, fileName: string): Session {
    const { laps, sessionResult, ...rest } = sessionDto;
    return {
      ...rest,
      fileName,
    };
  }
}
