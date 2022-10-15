import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lap } from 'src/acc/model';
import { Repository } from 'typeorm';

@Injectable()
export class LapService {
  constructor(
    @InjectRepository(Lap)
    private lapsRepository: Repository<Lap>,
  ) {}

  findAll(): Promise<Lap[]> {
    return this.lapsRepository.find();
  }

  async remove(lapId: number): Promise<void> {
    await this.lapsRepository.delete(lapId);
  }

  async save(lap: Lap): Promise<Lap> {
    try {
      return this.lapsRepository.save(lap);
    } catch (error) {
      console.log('error', error);
    }
  }

  async saveAll(laps: Lap[]): Promise<Lap[]> {
    try {
      return await this.lapsRepository.save(laps);
    } catch (error) {
      console.log(error);
    }
  }
}
