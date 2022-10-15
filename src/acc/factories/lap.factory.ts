import { Injectable } from '@nestjs/common';
import { LapDto } from '../dtos/Lap';
import { Lap, Session } from 'src/acc/model';

@Injectable()
export class LapFactory {
  constructor() {}

  toModel(lap: LapDto, sessionId: number, lapNumber: number): Lap {
    return {
      ...lap,
      sessionId,
      session: {
        sessionId,
      } as Session,
      lapNumber,
      bestSector1: lap.splits ? lap.splits[0] : 0,
      bestSector2: lap.splits ? lap.splits[1] : 0,
      bestSector3: lap.splits ? lap.splits[2] : 0,
    };
  }

  bulkToModel(lapsDto: LapDto[], sessionId: number): Lap[] {
    return lapsDto.map((lapDto, lapNumber) =>
      this.toModel(lapDto, sessionId, lapNumber + 1),
    );
  }
}
