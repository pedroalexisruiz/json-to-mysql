import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AC1ReadJsonController } from './controllers/ac1read-json.controller';
import { AC1_FACTORIES } from './factories';
import { AC1_ENTITIES } from './model';
import { AC1_SERVICES } from './services';
import { BASIC_DB_CONFIG } from 'src/config/db';

@Module({
  imports: [TypeOrmModule.forFeature([...AC1_ENTITIES])],
  controllers: [AC1ReadJsonController],
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          ...BASIC_DB_CONFIG,
          entities: [...AC1_ENTITIES],
        });
        return dataSource.initialize();
      },
    },
    ...AC1_FACTORIES,
    ...AC1_SERVICES,
  ],
})
export class Ac1Module {}
