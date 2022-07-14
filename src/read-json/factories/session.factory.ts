import { Injectable } from '@nestjs/common';
import { SessionDto } from '../dtos/Session';
import { Session } from '../model/Session';
import { LapFactory } from './lap.factory';
import { SessionResultFactory } from './session-result.factory';

@Injectable()
export class SessionFactory {
  constructor(
    private sessionResultFactory: SessionResultFactory,
    private lapFactory: LapFactory,
  ) {}

  toModel(sessionDto: SessionDto, fileName: string): Session {
    // sessionResult: this.sessionResultFactory.toModel({
    //   ...sessionDto.sessionResult,
    //   sessionIndex: sessionDto.sessionIndex,
    // }),
    const { laps, sessionResult, ...rest } = sessionDto;
    return {
      ...rest,
      fileName,
    };
  }
}
