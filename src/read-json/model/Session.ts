import { Lap } from './Lap';
import { SessionResult } from './SessionResult';
import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Session {
  @Column({ name: 'session_type' })
  sessionType: string;
  @Column({ name: 'track_name' })
  trackName: string;
  @PrimaryColumn({ name: 'session_index' })
  sessionIndex: number;
  @Column({ name: 'race_weekend_index' })
  raceWeekendIndex: number;
  @Column({ name: 'meta_data' })
  metaData: string;
  @Column({ name: 'server_name' })
  serverName: string;
  @OneToOne(() => SessionResult, (result) => result.session, {
    cascade: true,
  })
  sessionResult: SessionResult;
  // @OneToMany((type) => Lap, (lap) => lap.session)
  laps: Lap[];
}
