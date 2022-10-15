import { Entity, Column, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { AC1Car } from './AC1Car';

@Entity({ name: 'ac1_driver' })
export class AC1Driver {
  @PrimaryColumn({ name: 'guid' })
  Guid: string;
  @OneToMany(() => AC1Car, (car) => car.Driver, {
    cascade: false,
  })
  @JoinColumn({ name: 'session_index' })
  cars?: AC1Car[];
  @Column({ name: 'name' })
  Name: string;
  @Column({ name: 'nation' })
  Nation: string; //'COL, ITA, PLA
  @Column({ name: 'team' })
  Team: string;
}
