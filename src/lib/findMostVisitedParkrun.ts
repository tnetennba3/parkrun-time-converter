import { countBy, maxBy, toPairs } from "lodash";

import type { Parkrun, ParkrunResult } from "@/types";

export const findMostVisitedParkrun = (
  parkrunResults: ParkrunResult[],
): Parkrun | undefined => {
  if (parkrunResults.length === 0) return undefined;

  const parkruns = parkrunResults.map(({ parkrun }) => parkrun);
  const parkrunVisits = toPairs(countBy(parkruns)) as [Parkrun, number][];
  const mostFrequentedParkrun = maxBy(parkrunVisits, "1")![0];

  return mostFrequentedParkrun;
};
