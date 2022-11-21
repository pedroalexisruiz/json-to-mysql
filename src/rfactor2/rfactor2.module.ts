import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASIC_DB_CONFIG } from 'src/config/db';
import { DataSource } from 'typeorm';
import { RaceDataController } from './controllers/read-race-data.controller';
import { RF2_ENTITIES } from './entities';
import { RaceReaderService } from './services/ac1session-reader.service';

@Module({
  imports: [TypeOrmModule.forFeature([...RF2_ENTITIES])],
  controllers: [RaceDataController],
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          ...BASIC_DB_CONFIG,
          entities: [...RF2_ENTITIES],
        });
        return dataSource.initialize();
      },
    },
    RaceReaderService,
  ],
})
export class Rfactor2Module {}
