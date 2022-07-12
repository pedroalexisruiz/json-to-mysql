import { Entity, Column, PrimaryColumn, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class Car {
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
