import { Timing } from './Timing';
import { Driver } from './Driver';
import { Car } from './Car';
import { SessionResult } from './SessionResult';
import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Index,
} from 'typeorm';

@Entity()
@Index(['carId', 'sessionIndex', 'playerId'], { unique: true })
export class LeaderBoardLine {
  @PrimaryColumn({ name: 'session_index' })
  sessionIndex: number;
  @PrimaryColumn({ name: 'car_id' })
  carId: number;
  @PrimaryColumn({ name: 'player_id' })
  playerId: string;

  @ManyToOne(() => SessionResult, (result) => result.leaderBoardLines)
  @JoinColumn({ name: 'session_index' })
  sessionResult: SessionResult;

  @OneToOne(() => Car, { cascade: false })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @OneToOne(() => Driver, { cascade: false })
  @JoinColumn({ name: 'player_id' })
  currentDriver: Driver;
  @Column()
  currentDriverIndex: number;
  timing: Timing;
  @Column()
  missingMandatoryPitstop: number;
  driverTotalTimes: number[];
}
