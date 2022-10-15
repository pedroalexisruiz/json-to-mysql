import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AC1Session } from 'src/ac1/model';
import { Repository } from 'typeorm';

@Injectable()
export class AC1SessionService {
  constructor(
    @InjectRepository(AC1Session)
    private sessionsRepository: Repository<AC1Session>,
  ) {}

  findAll(): Promise<AC1Session[]> {
    return this.sessionsRepository.find();
  }

  findOne(fileName: string): Promise<AC1Session> {
    return this.sessionsRepository.findOneBy({ SessionFile: fileName });
  }

  async remove(sessionIndex: number): Promise<void> {
    await this.sessionsRepository.delete(sessionIndex);
  }

  async save(aC1Session: AC1Session): Promise<AC1Session> {
    try {
      return await this.sessionsRepository.save(aC1Session);
    } catch (error) {
      console.log('Error guardando sesión');
    }
  }
}
