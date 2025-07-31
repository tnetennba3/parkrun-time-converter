import { DateTime } from "luxon";

import { calculateCacheExpiryDate } from "./calculateCacheExpiryDate";

import { ParkrunResult } from "@/types";

export const shouldCacheResults = (results: ParkrunResult[]): boolean => {
  const now = DateTime.now().setZone("Europe/London");

  // Parkrun results are uploaded between 9:30am - 7pm on Saturdays
  const uploadWindowStart = calculateCacheExpiryDate().minus({ weeks: 1 });
  const uploadWindowEnd = uploadWindowStart.set({ hour: 19, minute: 0 });
  const inUploadWindow = now >= uploadWindowStart && now <= uploadWindowEnd;

  if (inUploadWindow) {
    const today = now.toISODate();
    const latestResult = results[0];

    // Don't cache results if there is no result from today
    if (latestResult.date !== today) {
      return false;
    }
  }

  return true;
};
