import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RF2CarEntity } from './RF2Car';
import { RF2IncidentEntity } from './RF2Incident';

@Entity({ name: 'rf2_session' })
export class RF2SessionEntity {
  @PrimaryGeneratedColumn('increment', { name: 'session_id' })
  sessionId?: number;
  @Column({ name: 'file_name', unique: true })
  fileName: string;
  // qualy, practice or race
  @Column({ name: 'session_type' })
  sessionType: string;
  @Column({ name: 'track_venue' })
  trackVenue: string;
  @Column({ name: 'track_event' })
  trackEvent: string;
  @Column({ name: 'date_time' })
  DateTime: string;
  @Column({ name: 'time_string' })
  TimeString: string;
  // en dto es Laps
  @Column({ name: 'count_laps' })
  countLaps: number;
  @Column({ name: 'fastest_lap' })
  fastestLap: number;
  @Column({ name: 'minutes' })
  Minutes: number;
  // en DTO es Stream, filtrar solo los incidentes
  @OneToMany(() => RF2IncidentEntity, (incident) => incident.session, {
    cascade: false,
  })
  incidents?: RF2IncidentEntity[];
  // en dto es Driver
  @OneToMany(() => RF2CarEntity, (car) => car.session, {
    cascade: false,
  })
  Cars?: RF2CarEntity[];
  @Column({ name: 'most_laps_completed' })
  MostLapsCompleted: number;
  @Column({ name: 'formation_and_start' })
  FormationAndStart?: number;
}
