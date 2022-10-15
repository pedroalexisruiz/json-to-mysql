import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/acc/model';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  findAll(): Promise<Session[]> {
    return this.sessionsRepository.find();
  }

  findOne(fileName: string): Promise<Session> {
    return this.sessionsRepository.findOneBy({ fileName });
  }

  async remove(sessionIndex: number): Promise<void> {
    await this.sessionsRepository.delete(sessionIndex);
  }

  async save(Session: Session): Promise<Session> {
    try {
      return await this.sessionsRepository.save(Session);
    } catch (error) {
      console.log('Error guardando sesión');
    }
  }
}
