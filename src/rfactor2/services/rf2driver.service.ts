import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RF2DriverEntity } from '../entities';

@Injectable()
export class RF2DriverService {
  constructor(
    @InjectRepository(RF2DriverEntity)
    private driversRepository: Repository<RF2DriverEntity>,
  ) {}

  findAll(): Promise<RF2DriverEntity[]> {
    return this.driversRepository.find();
  }

  async remove(driverIndex: number): Promise<void> {
    await this.driversRepository.delete(driverIndex);
  }

  async save(rf2Driver: RF2DriverEntity): Promise<RF2DriverEntity> {
    try {
      return await this.driversRepository.save(rf2Driver);
    } catch (error) {
      console.log('Error guardando driver de rfactor2');
    }
  }

  async saveAll(drivers: RF2DriverEntity[]): Promise<RF2DriverEntity[]> {
    try {
      return await this.driversRepository.save(drivers);
    } catch (error) {
      console.log(error);
      console.log('Error guardando drivers de rfactor2');
    }
  }

  async bulkSave(drivers: RF2DriverEntity[]): Promise<void> {
    drivers.forEach(async (driver) => {
      try {
        await this.driversRepository.save(driver);
      } catch (error) {
        console.log(`El conductor ${driver.SteamID} ya existían en BD`);
      }
    });
  }
}
