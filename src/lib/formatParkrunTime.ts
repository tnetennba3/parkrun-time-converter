import { Duration } from "luxon";

export const formatParkrunTime = (time: number): string => {
  const timeInMilliseconds = time * 1000;
  const duration = Duration.fromMillis(timeInMilliseconds);

  return duration.toFormat("m'm' s's'");
};
