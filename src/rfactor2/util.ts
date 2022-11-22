import { RF2DriverDTO } from './dto/RF2Driver';
import { RF2SessionConfigDTO } from './dto/RF2SessionConfig';

export const castIntFloat = (value: any): any => {
  if (!isNaN(value) && value.length < 12) {
    value = value % 1 === 0 ? parseInt(value, 10) : parseFloat(value);
  }
  return value;
};

export const getSessionType = (session: RF2SessionConfigDTO) => {
  if (session.Race) {
    return 'race';
  }
  if (session.Qualify) {
    return 'qualifying';
  }
  return 'practice';
};

export const findFastestLap = (drivers: RF2DriverDTO[]): number => {
  const sorted = drivers.sort(
    (a, b) =>
      a.BestLapTime &&
      b.BestLapTime &&
      (a.BestLapTime > b.BestLapTime ? 1 : -1),
  );
  return sorted[0].BestLapTime;
};

export const sortResults = (drivers: RF2DriverDTO[]): RF2DriverDTO[] => {
  const sortedResults = drivers.sort((a, b) =>
    a.Position > b.Position ? 1 : -1,
  );
  return sortedResults;
};

export const formatTime = (
  timeInSeconds: string | number,
  addHours: boolean = false,
) => {
  const pad = (num, size) => {
    return ('000' + num).slice(size * -1);
  };
  const stringTime = parseFloat(timeInSeconds + '').toFixed(3);
  const time = parseFloat(stringTime),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = stringTime.slice(-3);

  return `${addHours ? pad(hours, 2) + ':' : ''}${pad(minutes, 2)}:${pad(
    seconds,
    2,
  )}.${pad(milliseconds, 3)}`;
};

export const formatGap = (
  time: number,
  leadersTime: number,
  includeHours: boolean = false,
) => {
  const gapToLeader = time - leadersTime;
  return formatTime(gapToLeader.toFixed(3), includeHours);
};

export const getGapToFrist = (
  driver: RF2DriverDTO,
  leader: RF2DriverDTO,
  sessionType: string,
  sessionLapCount: number,
  position: number,
) => {
  if (position !== 1) {
    return gapToFirst(driver, leader, sessionLapCount, sessionType);
  } else {
    return '';
  }
};

export const gapToFirst = (
  driver: RF2DriverDTO,
  leader: RF2DriverDTO,
  sessionLapCount: number,
  sessionType: string,
) => {
  const { BestLapTime, FinishTime, Laps } = driver;
  if (sessionType === 'race' && FinishTime) {
    const lapsDown = sessionLapCount - Laps;

    if (lapsDown === 0 && leader?.FinishTime) {
      return formatGap(FinishTime, leader.FinishTime, true);
    }

    if (lapsDown > 0) {
      return `-${lapsDown}L`;
    }
  }

  if (sessionType === 'qualifying' && BestLapTime && leader?.BestLapTime) {
    return formatGap(BestLapTime, leader.BestLapTime);
  }
  return '';
};

export const formatFastestLap = (fastestTime) => {
  if (fastestTime) {
    return formatTime(fastestTime);
  } else {
    return 'No time set';
  }
};
