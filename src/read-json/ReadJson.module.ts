import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/read-json/model/Session';
import { LapFactory } from './factories/lap.factory';
import { SessionResultFactory } from './factories/session-result.factory';
import { SessionFactory } from './factories/session.factory';
import { Lap } from './model/Lap';
import { SessionResult } from './model/SessionResult';
import { ReadJsonController } from './read-json.controller';
import { ReadJsonService } from './services/read-json.service';
import { SessionService } from './services/session.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session, SessionResult, Lap])],
  controllers: [ReadJsonController],
  providers: [
    LapFactory,
    SessionResultFactory,
    SessionFactory,
    SessionService,
    ReadJsonService,
  ],
})
export class ReadJsonModule {}
