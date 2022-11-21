import { Injectable } from '@nestjs/common';
import { RF2LapDTO } from '../dto/RF2Lap';
import { RF2LapEntity } from '../entities';
import { formatTime } from '../util';

@Injectable()
export class RF2LapFactory {
  constructor() {}

  parseDTOtoModel(
    lap: RF2LapDTO,
    sessionId: number,
    steamId: string,
    VehFile: string,
  ): RF2LapEntity {
    const { _, et, ...rest } = lap;
    return {
      sessionId,
      steamId,
      VehFile,
      _: formatTime(_),
      et: formatTime(et),
      ...rest,
    };
  }

  bulkDTOToModel(
    lapsDto: RF2LapDTO[],
    sessionId: number,
    steamId: string,
    VehFile: string,
  ): RF2LapEntity[] {
    return lapsDto.map((lapDto) =>
      this.parseDTOtoModel(lapDto, sessionId, steamId, VehFile),
    );
  }
}
