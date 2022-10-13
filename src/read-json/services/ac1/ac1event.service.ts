import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AC1Event } from 'src/read-json/model/ac1/AC1Event';
import { Repository } from 'typeorm';

@Injectable()
export class AC1EventService {
  constructor(
    @InjectRepository(AC1Event)
    private lapsRepository: Repository<AC1Event>,
  ) {}

  findAll(): Promise<AC1Event[]> {
    return this.lapsRepository.find();
  }

  async remove(lapId: number): Promise<void> {
    await this.lapsRepository.delete(lapId);
  }

  async save(lap: AC1Event): Promise<AC1Event> {
    try {
      return this.lapsRepository.save(lap);
    } catch (error) {
      console.log('error', error);
    }
  }

  async saveAll(laps: AC1Event[]): Promise<AC1Event[]> {
    try {
      return await this.lapsRepository.save(laps);
    } catch (error) {
      console.log(error);
    }
  }
}
