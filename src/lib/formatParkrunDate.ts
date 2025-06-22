import { DateTime } from "luxon";

export const formatParkrunDate = (date: string): string => {
  return DateTime.fromFormat(date, "dd/MM/yyyy").toISODate() as string;
};
