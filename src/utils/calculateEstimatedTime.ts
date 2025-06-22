import { handicapToTime } from "@/data/handicap_to_time";
import { timeToHandicap } from "@/data/time_to_handicap";

export const calculateEstimatedTime = (
  minutes: number,
  seconds: number,
  currentSSS: number,
  targetSSS: number,
): string => {
  if (currentSSS === targetSSS) {
    return `${minutes}m ${seconds}s`;
  }

  const totalSeconds = minutes * 60 + seconds;
  const handicap = timeToHandicap[totalSeconds];
  const sssDifference = targetSSS - currentSSS;
  const adjustedHandicap = handicap + sssDifference;
  const adjustedTime = handicapToTime[adjustedHandicap.toFixed(1)];

  const adjustedMin = Math.floor(adjustedTime / 60);
  const adjustedSec = adjustedTime % 60;

  return `${adjustedMin}m ${adjustedSec}s`;
};
