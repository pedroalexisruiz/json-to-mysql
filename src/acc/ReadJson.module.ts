import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ACC_ENTITIES } from 'src/acc/model';
import { ACCReadJsonController } from './controllers/accread-json.controller';
import { ACC_SERVICES } from './services';
import { ACC_FACTORIES } from './factories';
import { BASIC_DB_CONFIG } from 'src/config/db';

@Module({
  imports: [TypeOrmModule.forFeature([...ACC_ENTITIES])],
  controllers: [ACCReadJsonController],
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          ...BASIC_DB_CONFIG,
          entities: [...ACC_ENTITIES],
        });
        return dataSource.initialize();
      },
    },
    ...ACC_FACTORIES,
    ...ACC_SERVICES,
  ],
})
export class ReadJsonModule {}
