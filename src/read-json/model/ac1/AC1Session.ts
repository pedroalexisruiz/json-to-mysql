import { AC1Car } from './AC1Car';
import { AC1Event } from './AC1Event';
import { AC1Lap } from './AC1Lap';
import { AC1Result } from './AC1Result';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ac1_session' })
export class AC1Session {
  @PrimaryGeneratedColumn('increment', { name: 'session_id' })
  sessionId?: number;
  @Column({ name: 'version' })
  Version: number;
  @OneToMany(() => AC1Car, (car) => car.session, {
    cascade: false,
  })
  Cars?: AC1Car[];
  @OneToMany(() => AC1Event, (event) => event.session, {
    cascade: false,
  })
  Events?: AC1Event[];
  @OneToMany(() => AC1Lap, (lap) => lap.session, {
    cascade: false,
  })
  Laps?: AC1Lap[];
  @OneToMany(() => AC1Result, (result) => result.session, {
    cascade: false,
  })
  Result?: AC1Result[];
  Penalties: null;
  @Column({ name: 'track_config' })
  TrackConfig: string;
  @Column({ name: 'track_name' })
  TrackName: string;
  @Column({ name: 'type' })
  Type: string;
  @Column({ name: 'date' })
  Date: Date;
  @Column({ name: 'session_file', unique: true })
  SessionFile: string;
  @Column({ name: 'championship_id' })
  ChampionshipID: string;
  @Column({ name: 'race_weekend_id' })
  RaceWeekendID: string;
}
