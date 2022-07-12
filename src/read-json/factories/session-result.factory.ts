import { Injectable } from '@nestjs/common';
import { SessionResultDto } from '../dtos/SessionResult';
import { Session } from '../model/Session';
import { SessionResult } from '../model/SessionResult';

@Injectable()
export class SessionResultFactory {
  constructor() {}

  toModel(sessionResultDto: SessionResultDto): SessionResult {
    return {
      ...sessionResultDto,
      bestSector1: sessionResultDto.bestSplits
        ? sessionResultDto.bestSplits[0]
        : 0,
      bestSector2: sessionResultDto.bestSplits
        ? sessionResultDto.bestSplits[1]
        : 0,
      bestSector3: sessionResultDto.bestSplits
        ? sessionResultDto.bestSplits[2]
        : 0,
      session: {
        sessionIndex: sessionResultDto.sessionIndex,
      } as Session,
    };
  }
}
