import { handicapToTime } from "@/data/handicap_to_time";
import { timeToHandicap } from "@/data/time_to_handicap";
import { sss } from "@/data/uk_parkrun_sss";

export const adjustTimeBySSS = (
  time: number,
  currentParkrun: keyof typeof sss,
  targetParkrun: keyof typeof sss,
): number => {
  const sssDifference = sss[targetParkrun] - sss[currentParkrun];

  if (sssDifference === 0) {
    return time;
  }

  const handicap = timeToHandicap[time];
  const adjustedHandicap = handicap + sssDifference;
  const adjustedTime = handicapToTime[adjustedHandicap.toFixed(1)];

  return adjustedTime;
};
