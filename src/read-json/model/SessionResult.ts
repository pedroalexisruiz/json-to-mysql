import { LeaderBoardLine } from './LeaderBoardLine';
import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Session } from './Session';

@Entity()
export class SessionResult {
  @PrimaryColumn({ name: 'session_index' })
  sessionIndex: number;
  @OneToOne(() => Session, (session) => session.sessionResult)
  @JoinColumn({ name: 'session_index' })
  session: Session;
  @Column()
  bestlap: number;
  @Column({ name: 'best_sector1' })
  bestSector1: number;
  @Column({ name: 'best_sector2' })
  bestSector2: number;
  @Column({ name: 'best_sector3' })
  bestSector3: number;
  @Column({ name: 'is_wet_Session' })
  isWetSession: number;
  @Column()
  type: number;
  @OneToMany(
    () => LeaderBoardLine,
    (leaderBoardLine) => leaderBoardLine.sessionResult,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'session_index' })
  leaderBoardLines: LeaderBoardLine[];
}
