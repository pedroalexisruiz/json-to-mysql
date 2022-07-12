import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lap } from './read-json/model/Lap';
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
      entities: [Session, SessionResult, Lap],
      synchronize: true,
    }),
    ReadJsonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
