import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Driver } from './Driver';
import { Session } from './Session';

@Entity({ name: 'acc_car' })
export class Car {
  @PrimaryColumn({ name: 'session_id' })
  sessionId: number;
  @OneToOne(() => Session, {
    cascade: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: Session;
  @Column({ name: 'player_id' })
  playerId: string;
  @ManyToOne(() => Driver, (driver) => driver.cars, {
    cascade: false,
  })
  @JoinColumn({ name: 'player_id' })
  driver?: Driver;
  @PrimaryColumn({ name: 'car_id' })
  carId: number;
  @Column({ name: 'race_number' })
  raceNumber: number;
  @Column({ name: 'car_model' })
  carModel: number;
  @Column({ name: 'cup_category' })
  cupCategory: number;
  @Column({ name: 'team_name' })
  teamName: string;
  @Column()
  nationality: number;
  @Column({ name: 'car_guid' })
  carGuid: number;
  @Column({ name: 'team_guid' })
  teamGuid: number;
  // drivers: Driver[];
}
