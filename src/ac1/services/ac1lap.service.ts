import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AC1Lap } from 'src/ac1/model';
import { Repository } from 'typeorm';

@Injectable()
export class AC1LapService {
  constructor(
    @InjectRepository(AC1Lap)
    private lapsRepository: Repository<AC1Lap>,
  ) {}

  findAll(): Promise<AC1Lap[]> {
    return this.lapsRepository.find();
  }

  async remove(lapId: number): Promise<void> {
    await this.lapsRepository.delete(lapId);
  }

  async save(lap: AC1Lap): Promise<AC1Lap> {
    try {
      return this.lapsRepository.save(lap);
    } catch (error) {
      console.log('error', error);
    }
  }

  async saveAll(laps: AC1Lap[]): Promise<AC1Lap[]> {
    try {
      return await this.lapsRepository.save(laps);
    } catch (error) {
      console.log(error);
    }
  }
}
