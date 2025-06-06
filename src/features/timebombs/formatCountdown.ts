import { intervalToDuration } from 'date-fns';

export const formatCountdownPadded = (ms: number): string => {
  const {
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = intervalToDuration({
    start: 0,
    end: ms,
  });

  // For very long durations (more than 30 days), show compact format
  if (days > 30 || months > 0 || years > 0) {
    return formatLongDuration({ years, months, days, hours });
  }

  // For medium durations (more than 1 day), show days + time
  if (days > 0) {
    return formatMediumDuration({ days, hours, minutes, seconds });
  }

  // For short durations (less than 1 day), show traditional HH:MM:SS
  return formatShortDuration({ hours, minutes, seconds });
};

const formatLongDuration = ({
  years,
  months,
  days,
  hours,
}: {
  years: number;
  months: number;
  days: number;
  hours: number;
}): string => {
  const parts: string[] = [];

  if (years > 0) parts.push(`${years}Y`);
  if (months > 0) parts.push(`${months}M`);
  if (days > 0) parts.push(`${days}D`);
  if (parts.length < 2 && hours > 0) parts.push(`${hours}H`);

  return parts.slice(0, 2).join(' '); // Show max 2 units
};

const formatMediumDuration = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${days}D ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const formatShortDuration = ({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
