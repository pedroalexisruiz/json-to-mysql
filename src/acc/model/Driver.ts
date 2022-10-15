import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { Car } from './Car';

@Entity({ name: 'acc_driver' })
export class Driver {
  @PrimaryColumn({ name: 'player_id' })
  playerId: string;
  @OneToMany(() => Car, (car) => car.driver, {
    cascade: false,
  })
  @JoinColumn({ name: 'session_index' })
  cars?: Car[];
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'last_name' })
  lastName: string;
  @Column({ name: 'short_name' })
  shortName: string;
}
