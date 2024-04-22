import {
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInWeeks,
} from 'date-fns';

export enum TimeDiffType {
  milliseconds = 'milliseconds',
  seconds = 'seconds',
  minutes = 'minutes',
  hours = 'hours',
  days = 'days',
  weeks = 'weeks',
  months = 'months',
}

export const diffFromNow = (
  date: string,
  type: TimeDiffType = TimeDiffType.hours
) => {
  const now = new Date();
  switch (type) {
    case TimeDiffType.milliseconds:
      return differenceInMilliseconds(new Date(date), now);
    case TimeDiffType.seconds:
      return differenceInSeconds(new Date(date), now);
    case TimeDiffType.minutes:
      return differenceInMinutes(new Date(date), now);
    case TimeDiffType.hours:
      return differenceInHours(new Date(date), now);
    case TimeDiffType.days:
      return differenceInDays(new Date(date), now);
    case TimeDiffType.weeks:
      return differenceInWeeks(new Date(date), now);
    case TimeDiffType.months:
      return differenceInMonths(new Date(date), now);

    default:
      return differenceInHours(new Date(date), now);
  }
};
