import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RF2SessionEntity } from '../entities';

@Injectable()
export class RF2SessionService {
  constructor(
    @InjectRepository(RF2SessionEntity)
    private sessionsRepository: Repository<RF2SessionEntity>,
  ) {}

  findAll(): Promise<RF2SessionEntity[]> {
    return this.sessionsRepository.find();
  }

  findOne(fileName: string): Promise<RF2SessionEntity> {
    return this.sessionsRepository.findOneBy({ fileName });
  }

  async remove(sessionIndex: number): Promise<void> {
    await this.sessionsRepository.delete(sessionIndex);
  }

  async save(rf2Session: RF2SessionEntity): Promise<RF2SessionEntity> {
    try {
      return await this.sessionsRepository.save(rf2Session);
    } catch (error) {
      console.log('Error guardando sesión de rfactor2');
    }
  }
}
