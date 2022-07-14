import { Entity, Column, PrimaryColumn, OneToOne, OneToMany } from 'typeorm';

@Entity({ name: 'acc_driver' })
export class Driver {
  @PrimaryColumn({ name: 'player_id' })
  playerId: string;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'last_name' })
  lastName: string;
  @Column({ name: 'short_name' })
  shortName: string;
}
