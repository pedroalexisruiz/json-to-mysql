import { Injectable } from '@nestjs/common';
import { LapDto } from '../dtos/Lap';
import { SessionResultDto } from '../dtos/SessionResult';
import { Lap } from '../model/Lap';
import { Session } from '../model/Session';
import { SessionResult } from '../model/SessionResult';

@Injectable()
export class LapFactory {
  constructor() {}

  toModel(lap: LapDto, sessionIndex: number, lapNumber: number): Lap {
    return {
      ...lap,
      sessionIndex,
      session: {
        sessionIndex,
      } as Session,
      lapNumber,
      bestSector1: lap.splits ? lap.splits[0] : 0,
      bestSector2: lap.splits ? lap.splits[1] : 0,
      bestSector3: lap.splits ? lap.splits[2] : 0,
    };
  }
}
