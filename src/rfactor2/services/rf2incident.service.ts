import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RF2IncidentEntity } from '../entities';

@Injectable()
export class RF2IncidentService {
  constructor(
    @InjectRepository(RF2IncidentEntity)
    private incidentsRepository: Repository<RF2IncidentEntity>,
  ) {}

  findAll(): Promise<RF2IncidentEntity[]> {
    return this.incidentsRepository.find();
  }

  async remove(incidentIndex: number): Promise<void> {
    await this.incidentsRepository.delete(incidentIndex);
  }

  async save(rf2Incident: RF2IncidentEntity): Promise<RF2IncidentEntity> {
    try {
      return await this.incidentsRepository.save(rf2Incident);
    } catch (error) {
      console.log('Error guardando incidente de rfactor2');
    }
  }

  async saveAll(incidents: RF2IncidentEntity[]): Promise<RF2IncidentEntity[]> {
    try {
      return await this.incidentsRepository.save(incidents);
    } catch (error) {
      console.log('Error guardando incidentes de rfactor2');
    }
  }
}
