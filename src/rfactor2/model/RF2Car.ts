import { RF2LapDTO } from '../dto/RF2Lap';
import { formatTime } from '../util';
import { RF2Driver } from './RF2Driver';
import { RF2Session } from './RF2Session';

export class RF2Car {
  sessionId: number;
  session?: RF2Session;
  steamId: string;
  driver?: RF2Driver;
  // car attrs
  VehFile: string;
  UpgradeCode: string;
  VehName: string;
  Category: string;
  CarType: string;
  CarClass: string;
  CarNumber: string;
  TeamName: string;
  isPlayer: number;
  GridPos: number;
  Position: number;
  ClassGridPos: number;
  ClassPosition: number;
  Points: number;
  ClassPoints: number;
  LapRankIncludingDiscos: number;
  // is Lap in DTO
  laps: RF2LapDTO[];
  BestLapTime: number;
  // is Laps in DTO
  countLaps: number;
  Pitstops: number;
  FinishStatus: string;
  FinishTime?: number;
  DNFReason?: string;

  formatGap(time: number, leadersTime: string, includeHours: boolean = false) {
    const gapToLeader = time - parseFloat(leadersTime);
    return formatTime(gapToLeader.toFixed(3), includeHours);
  }

  getGapToFrist(
    sessionType: string,
    sessionLapCount: number,
    leaderBestLapTime: string,
    leaderFinishTime: string,
  ) {
    if (this.Position !== 1) {
      if (sessionType === 'race' && this.FinishTime) {
        const lapsDown = sessionLapCount - this.countLaps;

        if (lapsDown === 0) {
          return this.formatGap(this.FinishTime, leaderFinishTime, true);
        }

        if (lapsDown > 0) {
          return `-${lapsDown}L`;
        }
      }

      if (sessionType === 'qualifying' && this.BestLapTime) {
        return this.formatGap(this.BestLapTime, leaderBestLapTime);
      }
    } else {
      return 0;
    }
  }
}
