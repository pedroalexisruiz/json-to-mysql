import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RF2Session } from './RF2Session';

@Entity({ name: 'rf2_incident' })
export class RF2Incident {
  @PrimaryGeneratedColumn('increment', { name: 'incident_id' })
  incidentId?: number;
  @Column({ name: 'session_id' })
  sessionId: number;
  @OneToOne(() => RF2Session, {
    cascade: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: RF2Session;
  description: string;
  @Column({ name: 'date' })
  et: Date;
}
