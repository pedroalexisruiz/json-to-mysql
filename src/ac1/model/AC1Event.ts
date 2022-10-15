import { AC1Driver } from './AC1Driver';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AC1Session } from './AC1Session';

@Entity({ name: 'ac1_event' })
export class AC1Event {
  @PrimaryGeneratedColumn('increment', { name: 'event_id' })
  eventId?: number;
  @Column({ name: 'session_id' })
  sessionId: number;
  @ManyToOne(() => AC1Session, { cascade: false })
  @JoinColumn({ name: 'session_id' })
  session: AC1Session;
  @Column({ name: 'car_id' })
  CarId: number;
  @Column({ name: 'driver_guid' })
  driverGuid: string;
  @ManyToOne(() => AC1Driver, {
    cascade: false,
  })
  @JoinColumn({ name: 'driver_guid', referencedColumnName: 'Guid' })
  Driver: AC1Driver;
  @Column({ name: 'impact_speed' })
  ImpactSpeed: number;
  @Column({ name: 'other_car_id' })
  OtherCarId: number;
  @Column({ name: 'other_driver_guid' })
  otherDriverGuid: string;
  @ManyToOne(() => AC1Driver, {
    cascade: false,
  })
  @JoinColumn({ name: 'other_driver_guid', referencedColumnName: 'Guid' })
  OtherDriver: AC1Driver;
  @Column({ name: 'type' })
  Type: string; // COLLISION_WITH_CAR, COLLISION_WITH_ENV
  @Column({ name: 'timestamp' })
  Timestamp: number;
  @Column({ name: 'after_session_end' })
  AfterSessionEnd: boolean;
}
