import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASIC_DB_CONFIG } from './config/db';
import { AC1_ENTITIES } from './ac1/model';
import { ACC_ENTITIES } from './acc/model';
import { ReadJsonModule } from './acc/ReadJson.module';
import { Rfactor2Module } from './rfactor2/rfactor2.module';
import { Ac1Module } from './ac1/ac1.module';
import { RF2_ENTITIES } from './rfactor2/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...BASIC_DB_CONFIG,
      entities: [...ACC_ENTITIES, ...AC1_ENTITIES, ...RF2_ENTITIES],
    }),
    ReadJsonModule,
    Ac1Module,
    Rfactor2Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
