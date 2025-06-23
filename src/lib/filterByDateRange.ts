import { DateTime } from "luxon";

import { ParkrunResult } from "@/types";

export type DateRange = "lastTwelveMonths" | "allTime";

const isInLastTwelveMonths = (date: string): boolean => {
  const { years } = DateTime.fromISO(date).diffNow("years");

  return years > -1;
};

export const filterByDateRange = (
  parkrunResults: ParkrunResult[],
  dateRange: DateRange,
): ParkrunResult[] => {
  if (dateRange === "allTime") return parkrunResults;

  return parkrunResults.filter(({ date }) => isInLastTwelveMonths(date));
};
