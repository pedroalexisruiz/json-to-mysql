import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { RF2CarEntity } from './RF2Car';
import { RF2SessionEntity } from './RF2Session';

@Entity({ name: 'rf2_lap' })
export class RF2LapEntity {
  @PrimaryColumn({ name: 'session_id' })
  sessionId: number;
  @OneToOne(() => RF2SessionEntity, {
    cascade: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: RF2SessionEntity;
  @PrimaryColumn({ name: 'steam_id' })
  steamId: string;
  @PrimaryColumn({ name: 'veh_file' })
  VehFile: string;
  @ManyToOne(() => RF2CarEntity, (car) => car.laps, {
    cascade: false,
  })
  @JoinColumn([{ name: 'steam_id' }, { name: 'veh_file' }])
  car?: RF2CarEntity;
  // car attrs
  @PrimaryColumn()
  num: number;
  @Column({ name: 'time' })
  _: number;
  @Column()
  p: number;
  @Column({ name: 'date' })
  et: Date;
  @Column()
  s1: number;
  @Column()
  s2: number;
  @Column()
  s3?: number;
  @Column()
  fuel: number;
  @Column()
  twfl: number;
  @Column()
  twfr: number;
  @Column()
  twrl: number;
  @Column()
  twrr: number;
  @Column()
  fcompound: string;
  @Column()
  rcompound: string;
  @Column()
  pit?: number;
}
