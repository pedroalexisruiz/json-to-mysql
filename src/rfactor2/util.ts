import { RF2SessionConfigDTO } from './dto/RF2SessionConfig';

export const castIntFloat = (value: any): any => {
  if (!isNaN(value)) {
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

export const findFastestLap = (drivers) => {
  const sorted = drivers.sort(
    (a, b) =>
      a.BestLapTime &&
      b.BestLapTime &&
      (a.BestLapTime > b.BestLapTime ? 1 : -1),
  );
  return sorted[0].BestLapTime;
};

export const sortResults = (drivers) => {
  const sortedResults = drivers.sort((a, b) =>
    a.Position > b.Position ? 1 : -1,
  );
  return sortedResults;
};

export const formatTime = (timeInSeconds: string, addHours: boolean) => {
  const pad = (num, size) => {
    return ('000' + num).slice(size * -1);
  };
  const stringTime = parseFloat(timeInSeconds).toFixed(3);
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
