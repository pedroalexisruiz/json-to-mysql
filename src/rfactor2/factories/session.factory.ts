import { Injectable } from '@nestjs/common';
import { RF2SessionConfigDTO } from '../dto/RF2SessionConfig';
import { RF2SessionEntity } from '../entities';
import { findFastestLap, getSessionType } from '../util';

@Injectable()
export class RF2SessionFactory {
  constructor() {}

  parseDTOtoModel(
    sessionConfig: RF2SessionConfigDTO,
    fileName: string,
  ): RF2SessionEntity {
    const { TrackVenue, TrackEvent } = sessionConfig;
    const sessionType = getSessionType(sessionConfig);
    const { Practice1, Qualify, Race } = sessionConfig;
    const session = Practice1 || Qualify || Race;
    const { Laps: countLaps, Stream, Driver, DateTime, ...rest } = session;
    const fastestLap = findFastestLap(Driver);
    return {
      sessionType,
      fileName,
      trackEvent: TrackEvent,
      trackVenue: TrackVenue,
      countLaps,
      fastestLap,
      DateTime: new Date(DateTime),
      ...rest,
    };
  }
}
