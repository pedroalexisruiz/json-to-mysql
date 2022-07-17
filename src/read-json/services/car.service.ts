import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/read-json/model/Car';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  findAll(): Promise<Car[]> {
    return this.carsRepository.find();
  }

  findOne(carId: number): Promise<Car> {
    return this.carsRepository.findOneBy({ carId });
  }

  async remove(carId: number): Promise<void> {
    await this.carsRepository.delete(carId);
  }

  async save(car: Car): Promise<Car> {
    try {
      return this.carsRepository.save(car);
    } catch (error) {
      console.log('El carro ya existe en BD');
    }
  }

  async saveAll(cars: Car[]): Promise<Car[]> {
    try {
      return await this.carsRepository.save(cars);
    } catch (error) {
      console.log('Algunos carros ya existían en BD');
    }
  }

  async bulkSave(cars: Car[]): Promise<void> {
    cars.forEach(async (car) => {
      try {
        await this.save(car);
      } catch (error) {
        console.log("error", error);
        console.log(`El vehiculo ${car.carId}, en la sesión ${car.sessionId} ya existían en BD`);
      }
    });
  }
}
