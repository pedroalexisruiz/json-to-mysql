import { Injectable } from '@nestjs/common';
import { LeaderBoardLineDto } from '../dtos/LeaderBoardLine';
import { LeaderBoardLine } from '../model/LeaderBoardLine';
import { SessionResult } from '../model/SessionResult';

@Injectable()
export class LeaderBoardLineFactory {
  constructor() {}

  toModel(
    leaderBoardLine: LeaderBoardLineDto,
    sessionIndex: number,
  ): LeaderBoardLine {
    return {
      ...leaderBoardLine,
      sessionIndex,
      sessionResult: {
        sessionIndex,
      } as SessionResult,
      carId: leaderBoardLine.car.carId,
      playerId: leaderBoardLine.currentDriver.playerId,
    };
  }
}
