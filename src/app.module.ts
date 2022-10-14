import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AC1_ENTITIES } from './read-json/model/ac1';
import { Car } from './read-json/model/Car';
import { Driver } from './read-json/model/Driver';
import { Lap } from './read-json/model/Lap';
import { LeaderBoardLine } from './read-json/model/LeaderBoardLine';
import { Session } from './read-json/model/Session';
import { SessionResult } from './read-json/model/SessionResult';
import { ReadJsonModule } from './read-json/ReadJson.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'asseto_corsa',
      entities: [
        Session,
        SessionResult,
        Lap,
        Driver,
        Car,
        LeaderBoardLine,
        ...AC1_ENTITIES,
      ],
      synchronize: false,
    }),
    ReadJsonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
