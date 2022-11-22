import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RF2LapEntity } from '../entities';

@Injectable()
export class RF2LapService {
  constructor(
    @InjectRepository(RF2LapEntity)
    private lapsRepository: Repository<RF2LapEntity>,
  ) {}

  findAll(): Promise<RF2LapEntity[]> {
    return this.lapsRepository.find();
  }

  async remove(lapIndex: number): Promise<void> {
    await this.lapsRepository.delete(lapIndex);
  }

  async save(rf2Lap: RF2LapEntity): Promise<RF2LapEntity> {
    try {
      return await this.lapsRepository.save(rf2Lap);
    } catch (error) {
      console.log('Error guardando lap de rfactor2');
    }
  }

  async saveAll(laps: RF2LapEntity[]): Promise<RF2LapEntity[]> {
    try {
      return await this.lapsRepository.save(laps);
    } catch (error) {
      console.log(error);
      console.log('Error guardando laps de rfactor2');
    }
  }
}
