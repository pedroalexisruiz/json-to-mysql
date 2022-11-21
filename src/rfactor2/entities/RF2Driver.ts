import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { RF2CarEntity } from './RF2Car';

@Entity({ name: 'rf2_driver' })
export class RF2DriverEntity {
  //driver attrs
  @Column({ name: 'name' })
  Name: string;
  @PrimaryColumn({ name: 'steam_id' })
  SteamID: number;

  @OneToMany(() => RF2CarEntity, (car) => car.driver, {
    cascade: false,
  })
  @JoinColumn({ name: 'session_index' })
  cars?: RF2CarEntity[];
}
