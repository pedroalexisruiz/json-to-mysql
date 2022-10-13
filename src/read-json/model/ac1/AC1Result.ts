import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { AC1Session } from './AC1Session';

@Entity({ name: 'ac1_result' })
export class AC1Result {
  @PrimaryColumn({ name: 'session_id' })
  sessionId: number;
  @ManyToOne(() => AC1Session, { cascade: false })
  @JoinColumn({ name: 'session_id' })
  session: AC1Session;
  @PrimaryColumn({ name: 'car_id' })
  CarId: number;
  @Column({ name: 'ballast_kg' })
  BallastKG: number;
  @Column({ name: 'best_lap' })
  BestLap: number;
  @Column({ name: 'car_model' })
  CarModel: string;
  @Column({ name: 'driver_guid' })
  DriverGuid: string;
  @Column({ name: 'driver_name' })
  DriverName: string;
  @Column({ name: 'restrictor' })
  Restrictor: number;
  @Column({ name: 'total_time' })
  TotalTime: number;
  @Column({ name: 'num_laps' })
  NumLaps: number;
  @Column({ name: 'class_id' })
  ClassID: string;
  @Column({ name: 'has_penalty' })
  HasPenalty: boolean;
  @Column({ name: 'penalty_time' })
  PenaltyTime: number;
  @Column({ name: 'lap_penalty' })
  LapPenalty: number;
  @Column({ name: 'disqualified' })
  Disqualified: boolean;
}
