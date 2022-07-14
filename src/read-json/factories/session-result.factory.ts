import { Injectable } from '@nestjs/common';
import { SessionResultDto } from '../dtos/SessionResult';
import { Session } from '../model/Session';
import { SessionResult } from '../model/SessionResult';
import { LeaderBoardLineFactory } from './leaderBoardLine.factory';

@Injectable()
export class SessionResultFactory {
  constructor(private leaderBoardLineFactory: LeaderBoardLineFactory) {}

  toModel(sessionResultDto: SessionResultDto, session: Session): SessionResult {
    const leaderBoardLines = sessionResultDto.leaderBoardLines.map(
      (leaderBoardLine, index) =>
        this.leaderBoardLineFactory.toModel(
          leaderBoardLine,
          session.sessionId,
          index,
        ),
    );
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
      leaderBoardLines,
      session: {
        sessionId: session.sessionId,
      } as Session,
      sessionId: session.sessionId,
    };
  }
}
