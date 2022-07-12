import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/read-json/model/Session';
import { LapFactory } from './factories/lap.factory';
import { LeaderBoardLineFactory } from './factories/leaderBoardLine.factory';
import { SessionResultFactory } from './factories/session-result.factory';
import { SessionFactory } from './factories/session.factory';
import { Car } from './model/Car';
import { Driver } from './model/Driver';
import { Lap } from './model/Lap';
import { LeaderBoardLine } from './model/LeaderBoardLine';
import { SessionResult } from './model/SessionResult';
import { ReadJsonController } from './read-json.controller';
import { CarService } from './services/car.service';
import { DriverService } from './services/driver.service';
import { ReadJsonService } from './services/read-json.service';
import { SessionService } from './services/session.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Session,
      SessionResult,
      Lap,
      Driver,
      Car,
      LeaderBoardLine,
    ]),
  ],
  controllers: [ReadJsonController],
  providers: [
    LapFactory,
    SessionResultFactory,
    SessionFactory,
    SessionService,
    ReadJsonService,
    LeaderBoardLineFactory,
    DriverService,
    CarService,
  ],
})
export class ReadJsonModule {}
