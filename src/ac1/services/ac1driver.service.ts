import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AC1Driver } from 'src/ac1/model';
import { Repository } from 'typeorm';

@Injectable()
export class AC1DriverService {
  constructor(
    @InjectRepository(AC1Driver)
    private driversRepository: Repository<AC1Driver>,
  ) {}

  findAll(): Promise<AC1Driver[]> {
    return this.driversRepository.find();
  }

  findOne(playerId: string): Promise<AC1Driver> {
    return this.driversRepository.findOneBy({ Guid: playerId });
  }

  async remove(playerId: number): Promise<void> {
    await this.driversRepository.delete(playerId);
  }

  async save(AC1Driver: AC1Driver): Promise<AC1Driver> {
    try {
      return this.driversRepository.save(AC1Driver);
    } catch (error) {
      console.log('El conductor ya existe');
    }
  }

  async saveAll(drivers: AC1Driver[]): Promise<AC1Driver[]> {
    try {
      return await this.driversRepository.save(drivers);
    } catch (error) {
      console.log('Algunos conductores ya están registrados');
    }
  }

  async bulkSave(drivers: AC1Driver[]): Promise<void> {
    drivers.forEach(async (driver) => {
      try {
        await this.save(driver);
      } catch (error) {
        console.log(`El conductor ${driver.Guid} ya existían en BD`);
      }
    });
  }
}
