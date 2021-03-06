import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Session } from './Session';

@Entity({ name: 'acc_lap' })
@Index(['carId', 'sessionId', 'lapNumber'], { unique: true })
export class Lap {
  @PrimaryColumn({ name: 'session_id' })
  sessionId: number;
  @ManyToOne(() => Session, { cascade: false })
  @JoinColumn({ name: 'session_id' })
  session: Session;
  @PrimaryColumn({ name: 'car_id' })
  carId: number;
  @PrimaryColumn({ name: 'lap_number' })
  lapNumber: number;
  @Column({ name: 'driver_index' })
  driverIndex: number; // Esto lo voy a sacar mejor del playerId de Driver
  @Column()
  laptime: number;
  @Column({ name: 'is_valid' })
  isValidForBest: boolean;
  @Column({ name: 'best_sector1' })
  bestSector1: number;
  @Column({ name: 'best_sector2' })
  bestSector2: number;
  @Column({ name: 'best_sector3' })
  bestSector3: number;
}
