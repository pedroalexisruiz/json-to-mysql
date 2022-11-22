import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { RF2DriverEntity } from './RF2Driver';
import { RF2LapEntity } from './RF2LapEntity';
import { RF2SessionEntity } from './RF2Session';

@Entity({ name: 'rf2_car' })
export class RF2CarEntity {
  @PrimaryColumn({ name: 'session_id' })
  sessionId: number;
  @OneToOne(() => RF2SessionEntity, {
    cascade: false,
  })
  @JoinColumn({ name: 'session_id' })
  session?: RF2SessionEntity;
  @PrimaryColumn({ name: 'steam_id' })
  SteamID: string;
  @ManyToOne(() => RF2DriverEntity, (driver) => driver.cars, {
    cascade: false,
  })
  @JoinColumn({ name: 'steam_id' })
  driver?: RF2DriverEntity;
  // car attrs
  @PrimaryColumn({ name: 'veh_file' })
  VehFile: string;
  @Column({ name: 'upgrade_code' })
  UpgradeCode: string;
  @Column({ name: 'veh_name' })
  VehName: string;
  @Column({ name: 'category' })
  Category: string;
  @Column({ name: 'car_type' })
  CarType: string;
  @Column({ name: 'car_class' })
  CarClass: string;
  @Column({ name: 'car_number' })
  CarNumber: string;
  @Column({ name: 'team_name' })
  TeamName: string;
  @Column({ name: 'is_player' })
  isPlayer: boolean;
  @Column({ name: 'grid_pos' })
  GridPos: number;
  @Column({ name: 'position' })
  Position: number;
  @Column({ name: 'class_grid_pos' })
  ClassGridPos: number;
  @Column({ name: 'class_position' })
  ClassPosition: number;
  @Column({ name: 'points' })
  Points: number;
  @Column({ name: 'class_points' })
  ClassPoints: number;
  @Column({ name: 'lap_rank_including_discos' })
  LapRankIncludingDiscos: number;
  // is Lap in DTO
  @OneToMany(() => RF2LapEntity, (lap) => lap.car)
  laps?: RF2LapEntity[];
  @Column({ name: 'best_lap_time' })
  BestLapTime: number;
  @Column({ name: 'formatted_best_lap_time' })
  formattedBestLapTime?: string;
  // is Laps in DTO
  @Column({ name: 'count_laps' })
  countLaps: number;
  @Column({ name: 'pit_stops' })
  Pitstops: number;
  @Column({ name: 'finish_status' })
  FinishStatus: string;
  @Column({ name: 'finish_time' })
  FinishTime?: number;
  @Column({ name: 'dnf_reason' })
  DNFReason?: string;
  @Column({ name: 'gap_to_first' })
  gapToFirst?: string;
}
