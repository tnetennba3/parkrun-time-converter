import { DateTime } from "luxon";

import { calculateCacheExpiryDate } from "./calculateCacheExpiryDate";

describe("calculateCacheExpiryDate", () => {
  jest.useFakeTimers();

  const expected = DateTime.local(2025, 8, 9, 9, 30, { zone: "Europe/London" });

  it("calculates the correct date when it is currently Tuesday 5pm", () => {
    jest.setSystemTime(new Date(2025, 7, 5, 17));

    expect(calculateCacheExpiryDate()).toEqual(expected);
  });

  it("calculates the correct date when it is currently Saturday 9am", () => {
    jest.setSystemTime(new Date(2025, 7, 9, 9));

    expect(calculateCacheExpiryDate()).toEqual(expected);
  });

  it("calculates the correct date when it is currently Saturday 10am", () => {
    jest.setSystemTime(new Date(2025, 7, 2, 10));

    expect(calculateCacheExpiryDate()).toEqual(expected);
  });

  it("calculates the correct date when it is currently Sunday 2pm", () => {
    jest.setSystemTime(new Date(2025, 7, 3, 14));

    expect(calculateCacheExpiryDate()).toEqual(expected);
  });
});
