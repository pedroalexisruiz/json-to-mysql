import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionResult } from 'src/read-json/model/acc';
import { Repository } from 'typeorm';

@Injectable()
export class SessionResultService {
  constructor(
    @InjectRepository(SessionResult)
    private sessionResultsRepository: Repository<SessionResult>,
  ) {}

  findAll(): Promise<SessionResult[]> {
    return this.sessionResultsRepository.find();
  }

  async remove(sessionResultId: number): Promise<void> {
    await this.sessionResultsRepository.delete(sessionResultId);
  }

  async save(sessionResult: SessionResult): Promise<SessionResult> {
    try {
      return this.sessionResultsRepository.save(sessionResult);
    } catch (error) {
      console.log('error', error);
    }
  }

  async saveAll(sessionResults: SessionResult[]): Promise<SessionResult[]> {
    try {
      return await this.sessionResultsRepository.save(sessionResults);
    } catch (error) {
      console.log(error);
    }
  }
}
