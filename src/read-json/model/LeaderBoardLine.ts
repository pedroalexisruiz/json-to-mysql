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

@Entity({ name: 'acc_leaderboardline' })
@Index(['carId', 'sessionId', 'playerId'], { unique: true })
export class LeaderBoardLine {
  @PrimaryColumn({ name: 'session_id' })
  sessionId: number;
  @PrimaryColumn({ name: 'car_id' })
  carId: number;
  @PrimaryColumn({ name: 'player_id' })
  playerId: string;
  @Column()
  position: number;
  @ManyToOne(() => SessionResult, (result) => result.leaderBoardLines, {
    cascade: false,
  })
  @JoinColumn({ name: 'session_id' })
  sessionResult: SessionResult;

  @OneToOne(() => Car, { cascade: false })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @OneToOne(() => Driver, { cascade: false })
  @JoinColumn({ name: 'player_id' })
  currentDriver: Driver;
  @Column()
  currentDriverIndex: number;
  @Column({ name: 'tiempo_ultima_vuelta' })
  lastLap: number;
  @Column({ name: 'ultimo_sector1' })
  lastSector1: number;
  @Column({ name: 'ultimo_sector2' })
  lastSector2: number;
  @Column({ name: 'ultimo_sector3' })
  lastSector3: number;
  @Column({ name: 'mejor_vuelta' })
  bestLap: number;
  @Column({ name: 'mejor_sector1' })
  bestSector1: number;
  @Column({ name: 'mejor_sector2' })
  bestSector2: number;
  @Column({ name: 'mejor_sector3' })
  bestSector3: number;
  @Column({ name: 'tiempo_total' })
  totalTime: number;
  @Column({ name: 'cantidad_de_vueltas' })
  lapCount: number;
  @Column()
  missingMandatoryPitstop: number;
  driverTotalTimes: number[];
}
