import { LeaderBoardLine } from './LeaderBoardLine';

export interface SessionResultDto {
  sessionIndex: number;
  bestlap: number;
  bestSplits: number[];
  isWetSession: number;
  type: number;
  leaderBoardLines: LeaderBoardLine[];
}
