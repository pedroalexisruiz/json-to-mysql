import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RF2LapDTO } from '../dto/RF2Lap';
import { RF2CarEntity, RF2LapEntity } from '../entities';
import { RF2LapService } from './rf2lap.service';

@Injectable()
export class RF2CarService {
  constructor(
    @InjectRepository(RF2CarEntity)
    private carsRepository: Repository<RF2CarEntity>,
    private lapService: RF2LapService,
  ) {}

  findAll(): Promise<RF2CarEntity[]> {
    return this.carsRepository.find();
  }

  async remove(carIndex: number): Promise<void> {
    await this.carsRepository.delete(carIndex);
  }

  async save(rf2Car: RF2CarEntity): Promise<RF2CarEntity> {
    try {
      return await this.carsRepository.save(rf2Car);
    } catch (error) {
      console.log('Error guardando car de rfactor2');
    }
  }

  async saveAll(cars: RF2CarEntity[]): Promise<RF2CarEntity[]> {
    try {
      const carsSaved = await this.carsRepository.save(cars);
      const lapsToSave: RF2LapEntity[] = [];
      cars.forEach((car) => {
        lapsToSave.push(...(car.laps ?? []));
      });
      this.lapService.saveAll(lapsToSave);
      return carsSaved;
    } catch (error) {
      console.log(error);
      console.log('Error guardando cars de rfactor2');
    }
  }
}
