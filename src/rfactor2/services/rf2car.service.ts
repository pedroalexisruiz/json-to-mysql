import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RF2CarEntity } from '../entities';

@Injectable()
export class RF2CarService {
  constructor(
    @InjectRepository(RF2CarEntity)
    private carsRepository: Repository<RF2CarEntity>,
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
      console.log('Error guardando care de rfactor2');
    }
  }

  async saveAll(cars: RF2CarEntity[]): Promise<RF2CarEntity[]> {
    try {
      return await this.carsRepository.save(cars);
    } catch (error) {
      console.log(error);
      console.log('Error guardando cares de rfactor2');
    }
  }
}
