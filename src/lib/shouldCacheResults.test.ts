import { shouldCacheResults } from "./shouldCacheResults";

describe("shouldCacheResults", () => {
  jest.useFakeTimers();

  const parkrunResults = [
    {
      date: "2025-05-24",
      parkrun: "Edinburgh" as const,
      time: 2320,
    },
    {
      date: "2024-11-23",
      parkrun: "Black Park" as const,
      time: 2268,
    },
  ];

  it("returns true when it's not a Saturday", () => {
    jest.setSystemTime(new Date(2025, 7, 5, 17));

    expect(shouldCacheResults(parkrunResults)).toBe(true);
  });

  it("returns true when it's Saturday before the Parkrun results upload window", () => {
    jest.setSystemTime(new Date(2025, 7, 9, 9));

    expect(shouldCacheResults(parkrunResults)).toBe(true);
  });

  it("returns true when it's Saturday after the Parkrun results upload window", () => {
    jest.setSystemTime(new Date(2025, 7, 9, 20));

    expect(shouldCacheResults(parkrunResults)).toBe(true);
  });

  describe("during the Parkrun results upload window", () => {
    beforeAll(() => {
      jest.setSystemTime(new Date(2025, 7, 9, 11));
    });

    it("returns false when there is no result from today", () => {
      expect(shouldCacheResults(parkrunResults)).toBe(false);
    });

    it("returns true when there is a result from today", () => {
      const newResult = {
        date: "2025-08-09",
        parkrun: "Edinburgh" as const,
        time: 1800,
      };

      expect(shouldCacheResults([newResult, ...parkrunResults])).toBe(true);
    });
  });
});
