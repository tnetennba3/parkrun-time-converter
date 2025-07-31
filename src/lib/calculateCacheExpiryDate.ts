import { DateTime } from "luxon";

/*
 * Parkruns take place every Saturday at 9am. So the earliest time
 * results might get uploaded is at Saturday 9:30am, which is
 * therefore when we want to our cached results to expire.
 */

export const calculateCacheExpiryDate = (): DateTime => {
  const now = DateTime.local({ zone: "Europe/London" });

  let expiryDate = now.set({
    weekday: 6,
    hour: 9,
    minute: 30,
    second: 0,
    millisecond: 0,
  });

  if (expiryDate < now) {
    expiryDate = expiryDate.plus({ weeks: 1 });
  }

  return expiryDate;
};
