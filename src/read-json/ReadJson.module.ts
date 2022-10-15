import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AC1ReadJsonController } from './controllers/ac1/ac1read-json.controller';
import { AC1_FACTORIES } from './factories/ac1';
import { AC1_ENTITIES } from './model/ac1';
import { ACC_ENTITIES } from 'src/read-json/model/acc';
import { ACCReadJsonController } from './controllers/acc/accread-json.controller';
import { AC1_SERVICES } from './services/ac1';
import { ACC_SERVICES } from './services/acc';
import { ACC_FACTORIES } from './factories/acc';

@Module({
  imports: [TypeOrmModule.forFeature([...ACC_ENTITIES, ...AC1_ENTITIES])],
  controllers: [ACCReadJsonController, AC1ReadJsonController],
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
          entities: [...ACC_ENTITIES, ...AC1_ENTITIES],
          synchronize: false,
          name: 'assetoCorsaConnection',
        });
        return dataSource.initialize();
      },
    },
    ...ACC_FACTORIES,
    ...ACC_SERVICES,
    ...AC1_FACTORIES,
    ...AC1_SERVICES,
  ],
})
export class ReadJsonModule {}
