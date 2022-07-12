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

  toModel(sessionDto: SessionDto): Session {
    return {
      ...sessionDto,
      sessionResult: this.sessionResultFactory.toModel({
        ...sessionDto.sessionResult,
        sessionIndex: sessionDto.sessionIndex,
      }),
      laps: sessionDto.laps.map((lapDto, lapNumber) =>
        this.lapFactory.toModel(lapDto, sessionDto.sessionIndex, lapNumber),
      ),
    };
  }
}
