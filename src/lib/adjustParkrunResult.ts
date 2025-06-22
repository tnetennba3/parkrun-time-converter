import { adjustTimeBySSS } from "./adjustTimeBySSS";

import type { AdjustedParkrunResult, Parkrun, ParkrunResult } from "@/types";

export const adjustParkrunResult = (
  result: ParkrunResult,
  targetParkrun: Parkrun,
): AdjustedParkrunResult => {
  const { date, parkrun, time } = result;

  if (parkrun === targetParkrun) return result;

  const adjustedTime = adjustTimeBySSS(time, parkrun, targetParkrun);

  return { date, parkrun, time: adjustedTime, originalTime: time };
};
