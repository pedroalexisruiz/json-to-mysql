import { Lap } from './Lap';
import { SessionResult } from './SessionResult';
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'acc_session' })
export class Session {
  @PrimaryGeneratedColumn('increment', { name: 'session_id' })
  sessionId?: number;
  @Column({ name: 'file_name', unique: true })
  fileName: string;
  @Column({ name: 'session_type' })
  sessionType: string;
  @Column({ name: 'track_name' })
  trackName: string;
  @Column({ name: 'session_index' })
  sessionIndex: number;
  @Column({ name: 'race_weekend_index' })
  raceWeekendIndex: number;
  @Column({ name: 'meta_data' })
  metaData: string;
  @Column({ name: 'server_name' })
  serverName: string;
  @OneToOne(() => SessionResult, (result) => result.session, {
    cascade: false,
  })
  sessionResult?: SessionResult;
  @OneToMany(() => Lap, (lap) => lap.session, {
    cascade: false,
  })
  laps?: Lap[];
}
