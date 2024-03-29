import { AC1Driver } from './AC1Driver';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AC1Session } from './AC1Session';

@Entity({ name: 'ac1_car' })
export class AC1Car {
  @PrimaryColumn({ name: 'car_id' })
  CarId: number;
  @PrimaryColumn({ name: 'session_id' })
  sessionId: number;
  @OneToOne(() => AC1Session, {
    cascade: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: AC1Session;
  @Column({ name: 'guid' })
  guid: string;
  @ManyToOne(() => AC1Driver, (driver) => driver.cars, {
    cascade: false,
  })
  @JoinColumn({ name: 'guid' })
  Driver: AC1Driver;
  @Column({ name: 'ballast_kg' })
  BallastKG: number;
  @Column({ name: 'model' })
  Model: string;
  @Column({ name: 'restrictor' })
  Restrictor: number;
  @Column({ name: 'skin' })
  Skin: string;
  @Column({ name: 'class_id' })
  ClassID: string;
}
