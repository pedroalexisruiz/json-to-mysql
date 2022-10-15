import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AC1_ENTITIES } from './read-json/model/ac1';
import { ACC_ENTITIES } from './read-json/model/acc';
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
      entities: [...ACC_ENTITIES, ...AC1_ENTITIES],
      synchronize: false,
    }),
    ReadJsonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
