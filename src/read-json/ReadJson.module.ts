import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/read-json/model/Session';
import { DataSource } from 'typeorm';
import { AC1ReadJsonController } from './controllers/ac1/ac1read-json.controller';
import { AC1_FACTORIES } from './factories/ac1';
import { LapFactory } from './factories/lap.factory';
import { LeaderBoardLineFactory } from './factories/leaderBoardLine.factory';
import { SessionResultFactory } from './factories/session-result.factory';
import { SessionFactory } from './factories/session.factory';
import { AC1_ENTITIES } from './model/ac1';
import { Car } from './model/Car';
import { Driver } from './model/Driver';
import { Lap } from './model/Lap';
import { LeaderBoardLine } from './model/LeaderBoardLine';
import { SessionResult } from './model/SessionResult';
import { ReadJsonController } from './read-json.controller';
import { AC1_SERVICES } from './services/ac1';
import { CarService } from './services/car.service';
import { DriverService } from './services/driver.service';
import { LapService } from './services/lap.service';
import { ReadJsonService } from './services/read-json.service';
import { SessionResultService } from './services/session-result.service';
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
      ...AC1_ENTITIES,
    ]),
  ],
  controllers: [AC1ReadJsonController],
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'asseto_corsa',
          entities: [Session, SessionResult, Lap, Driver, Car, LeaderBoardLine],
          synchronize: false,
          name: 'assetoCorsaConnection',
        });
        return dataSource.initialize();
      },
    },
    LapFactory,
    SessionResultFactory,
    SessionFactory,
    LapService,
    SessionResultService,
    SessionService,
    ReadJsonService,
    LeaderBoardLineFactory,
    DriverService,
    CarService,
    ...AC1_FACTORIES,
    ...AC1_SERVICES,
  ],
})
export class ReadJsonModule {}
