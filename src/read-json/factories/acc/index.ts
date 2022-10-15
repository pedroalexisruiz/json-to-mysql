import { LapFactory } from './lap.factory';
import { LeaderBoardLineFactory } from './leaderBoardLine.factory';
import { SessionResultFactory } from './session-result.factory';
import { SessionFactory } from './session.factory';

const ACC_FACTORIES = [
  LapFactory,
  LeaderBoardLineFactory,
  SessionResultFactory,
  SessionFactory,
];

export {
  LapFactory,
  LeaderBoardLineFactory,
  SessionResultFactory,
  SessionFactory,
  ACC_FACTORIES,
};
