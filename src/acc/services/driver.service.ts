import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/acc/model';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}

  findAll(): Promise<Driver[]> {
    return this.driversRepository.find();
  }

  findOne(playerId: string): Promise<Driver> {
    return this.driversRepository.findOneBy({ playerId });
  }

  async remove(playerId: number): Promise<void> {
    await this.driversRepository.delete(playerId);
  }

  async save(Driver: Driver): Promise<Driver> {
    try {
      return this.driversRepository.save(Driver);
    } catch (error) {
      console.log('El conductor ya existe');
    }
  }

  async saveAll(drivers: Driver[]): Promise<Driver[]> {
    try {
      return await this.driversRepository.save(drivers);
    } catch (error) {
      console.log('Algunos conductores ya están registrados');
    }
  }

  async bulkSave(drivers: Driver[]): Promise<void> {
    drivers.forEach(async (driver) => {
      try {
        await this.save(driver);
      } catch (error) {
        console.log(`El conductor ${driver.playerId} ya existían en BD`);
      }
    });
  }
}
