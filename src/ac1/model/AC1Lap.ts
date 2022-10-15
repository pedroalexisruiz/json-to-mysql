import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, Index } from 'typeorm';
import { AC1Session } from './AC1Session';

@Entity({ name: 'ac1_lap' })
@Index(['CarId', 'sessionId', 'lapNumber'], { unique: true })
export class AC1Lap {
  @PrimaryColumn({ name: 'session_id' })
  sessionId: number;
  @ManyToOne(() => AC1Session, { cascade: false })
  @JoinColumn({ name: 'session_id' })
  session: AC1Session;
  @PrimaryColumn({ name: 'car_id' })
  CarId: number;
  @PrimaryColumn({ name: 'lap_number' })
  lapNumber: number;
  @Column({ name: 'ballast_kg' })
  BallastKG: number;
  @Column({ name: 'cuts' })
  Cuts: number;
  @Column({ name: 'lap_time' })
  LapTime: number;
  @Column({ name: 'restrictor' })
  Restrictor: number;
  @Column({ name: 'sectors' })
  Sectors: string; //se concatenan separados por coma "12313,3213,3213"
  @Column({ name: 'timestamp' })
  Timestamp: number;
  @Column({ name: 'tyre' })
  Tyre: string; //H,M,S
  @Column({ name: 'contributed_to_fastest_lap' })
  ContributedToFastestLap: boolean;
}
