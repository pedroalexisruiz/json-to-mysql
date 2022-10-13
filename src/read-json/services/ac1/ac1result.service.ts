import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AC1Result } from 'src/read-json/model/ac1/AC1Result';
import { Repository } from 'typeorm';

@Injectable()
export class AC1ResultService {
  constructor(
    @InjectRepository(AC1Result)
    private lapsRepository: Repository<AC1Result>,
  ) {}

  findAll(): Promise<AC1Result[]> {
    return this.lapsRepository.find();
  }

  async remove(lapId: number): Promise<void> {
    await this.lapsRepository.delete(lapId);
  }

  async save(lap: AC1Result): Promise<AC1Result> {
    try {
      return this.lapsRepository.save(lap);
    } catch (error) {
      console.log('error', error);
    }
  }

  async saveAll(laps: AC1Result[]): Promise<AC1Result[]> {
    try {
      return await this.lapsRepository.save(laps);
    } catch (error) {
      console.log(error);
    }
  }
}
