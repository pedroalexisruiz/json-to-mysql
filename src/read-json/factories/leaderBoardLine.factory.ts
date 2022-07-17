import { Injectable } from '@nestjs/common';
import { LeaderBoardLineDto } from '../dtos/LeaderBoardLine';
import { LeaderBoardLine } from '../model/LeaderBoardLine';
import { SessionResult } from '../model/SessionResult';

@Injectable()
export class LeaderBoardLineFactory {
  constructor() {}

  toModel(
    leaderBoardLine: LeaderBoardLineDto,
    sessionId: number,
    position: number,
  ): LeaderBoardLine {
    const { currentDriver } = leaderBoardLine;
    const { lastLap, lastSplits, bestLap, bestSplits, totalTime, lapCount } =
      leaderBoardLine.timing;
    return {
      ...leaderBoardLine,
      sessionId,
      position,
      sessionResult: {
        sessionId,
      } as SessionResult,
      carId: leaderBoardLine.car.carId,
      car: {
        ...leaderBoardLine.car,
        sessionId,
        playerId: currentDriver.playerId,
        driver: currentDriver,
      },
      lastLap,
      lastSector1: lastSplits[0],
      lastSector2: lastSplits[1],
      lastSector3: lastSplits[2],
      bestLap,
      bestSector1: bestSplits[0],
      bestSector2: bestSplits[1],
      bestSector3: bestSplits[2],
      totalTime,
      lapCount,
    };
  }
}
