import { Injectable } from '@nestjs/common';
import { RF2DriverDTO } from '../dto/RF2Driver';
import { RF2LapDTO } from '../dto/RF2Lap';
import { RF2CarEntity, RF2LapEntity, RF2SessionEntity } from '../entities';
import { formatTime, getGapToFrist } from '../util';
import { RF2DriverFactory } from './driver.factory';
import { RF2LapFactory } from './lap.factory';

@Injectable()
export class RF2CarFactory {
  constructor(
    private lapFactory: RF2LapFactory,
    private driverFactory: RF2DriverFactory,
  ) {}

  parseDTOtoModel(
    car: RF2DriverDTO,
    session: RF2SessionEntity,
    leader: RF2DriverDTO,
  ): RF2CarEntity {
    const {
      SteamID,
      Laps: countLaps,
      Lap: laps,
      CarNumber,
      Position,
      isPlayer,
      VehFile,
    } = car;
    const driver = this.driverFactory.parseDTOtoModel(car);
    const gapToFirst = getGapToFrist(
      car,
      leader,
      session.sessionType,
      session.countLaps,
      Position,
    );
    const steamID = SteamID.toString();
    return {
      ...car,
      SteamID: steamID,
      sessionId: session.sessionId,
      CarNumber,
      countLaps,
      isPlayer: Boolean(isPlayer),
      gapToFirst,
      driver,
      formattedBestLapTime: formatTime(car.BestLapTime),
      laps: laps
        ? Array.isArray(laps)
          ? laps.map((lap) =>
              this.lapFactory.parseDTOtoModel(
                lap,
                session.sessionId,
                steamID,
                VehFile,
              ),
            )
          : [
              this.lapFactory.parseDTOtoModel(
                laps as RF2LapDTO,
                session.sessionId,
                steamID,
                VehFile,
              ),
            ]
        : [],
    };
  }

  bulkDTOToModel(
    carsDto: RF2DriverDTO[],
    session: RF2SessionEntity,
    leader: RF2DriverDTO,
  ): RF2CarEntity[] {
    return carsDto.map((carDto) =>
      this.parseDTOtoModel(carDto, session, leader),
    );
  }
}
