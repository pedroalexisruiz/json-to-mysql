import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AC1Car } from 'src/ac1/model';
import { Repository } from 'typeorm';

@Injectable()
export class AC1CarService {
  constructor(
    @InjectRepository(AC1Car)
    private carsRepository: Repository<AC1Car>,
  ) {}

  findAll(): Promise<AC1Car[]> {
    return this.carsRepository.find();
  }

  findOne(carId: number): Promise<AC1Car> {
    return this.carsRepository.findOneBy({ CarId: carId });
  }

  async remove(carId: number): Promise<void> {
    await this.carsRepository.delete(carId);
  }

  async save(car: AC1Car): Promise<AC1Car> {
    try {
      return this.carsRepository.save(car);
    } catch (error) {
      console.log('El carro ya existe en BD');
    }
  }

  async saveAll(cars: AC1Car[]): Promise<AC1Car[]> {
    try {
      return await this.carsRepository.save(cars);
    } catch (error) {
      console.log('Algunos carros ya existían en BD');
    }
  }

  async bulkSave(cars: AC1Car[]): Promise<void> {
    cars.forEach(async (car) => {
      try {
        await this.save(car);
      } catch (error) {
        console.log('error', error);
        console.log(
          `El vehiculo ${car.CarId}, en la sesión ${car.sessionId} ya existían en BD`,
        );
      }
    });
  }
}
