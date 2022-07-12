import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Session } from './Session';

@Entity()
@Index(['carId', 'sessionIndex', 'lapNumber'], { unique: true })
export class Lap {
  @PrimaryColumn({ name: 'session_index' })
  sessionIndex: number;
  @ManyToOne(() => Session, (session) => session.laps)
  @JoinColumn({ name: 'session_index' })
  session: Session;
  @PrimaryColumn({ name: 'car_id' })
  carId: number;
  @PrimaryColumn({ name: 'lap_number' })
  lapNumber: number;
  @Column({ name: 'driver_index' })
  driverIndex: number;
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
