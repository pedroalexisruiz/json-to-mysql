import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASIC_DB_CONFIG } from 'src/config/db';
import { DataSource } from 'typeorm';
import { RaceDataController } from './controllers/read-race-data.controller';
import { RF2_ENTITIES } from './entities';
import { RF2_FACTORIES } from './factories';
import { RF2_SERVICES } from './services';
import { RaceReaderService } from './services/race-reader.service';

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
    ...RF2_FACTORIES,
    ...RF2_SERVICES,
    RaceReaderService,
  ],
})
export class Rfactor2Module {}
