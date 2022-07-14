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
    position: number,
  ): LeaderBoardLine {
    const { lastLap, lastSplits, bestLap, bestSplits, totalTime, lapCount } =
      leaderBoardLine.timing;
    return {
      ...leaderBoardLine,
      sessionIndex,
      position,
      sessionResult: {
        sessionIndex,
      } as SessionResult,
      carId: leaderBoardLine.car.carId,
      playerId: leaderBoardLine.currentDriver.playerId,
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