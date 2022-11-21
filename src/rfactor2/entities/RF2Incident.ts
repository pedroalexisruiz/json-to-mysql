import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RF2SessionEntity } from './RF2Session';

@Entity({ name: 'rf2_incident' })
export class RF2IncidentEntity {
  @PrimaryGeneratedColumn('increment', { name: 'incident_id' })
  incidentId?: number;
  @Column({ name: 'session_id' })
  sessionId: number;
  @OneToOne(() => RF2SessionEntity, {
    cascade: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: RF2SessionEntity;
  @Column({ name: 'description' })
  description: string;
  @Column({ name: 'date' })
  et: Date;
}
