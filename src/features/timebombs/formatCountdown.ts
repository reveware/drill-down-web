import { intervalToDuration } from 'date-fns';

export const formatCountdownPadded = (ms: number): string => {
  const {
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = intervalToDuration({
    start: 0,
    end: ms,
  });

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
