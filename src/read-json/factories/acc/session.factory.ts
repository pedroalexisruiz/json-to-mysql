import { Injectable } from '@nestjs/common';
import { SessionDto } from '../../dtos/Session';
import { Session } from 'src/read-json/model/acc';

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
