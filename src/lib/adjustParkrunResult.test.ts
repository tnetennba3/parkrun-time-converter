import { adjustParkrunResult } from "./adjustParkrunResult";

describe("adjustParkrunResult", () => {
  const parkrunResult = {
    date: "2025-05-10",
    time: 30 * 60,
    parkrun: "Bushy Park",
  } as const;

  it("adjusts a parkrun result to show adjusted time and original time", () => {
    expect(adjustParkrunResult(parkrunResult, "Carlisle")).toEqual({
      date: "2025-05-10",
      time: 1895,
      parkrun: "Bushy Park",
      originalTime: 30 * 60,
    });
  });

  it("shows adjusted time and original time even when there is no SSS difference", () => {
    expect(adjustParkrunResult(parkrunResult, "Cardiff")).toEqual({
      date: "2025-05-10",
      time: 30 * 60,
      parkrun: "Bushy Park",
      originalTime: 30 * 60,
    });
  });

  it("returns original parkrun result when at target parkrun", () => {
    expect(adjustParkrunResult(parkrunResult, "Bushy Park")).toEqual(
      parkrunResult,
    );
  });

  it("returns undefined when adjusted time could not be calculated", () => {
    expect(
      adjustParkrunResult({ ...parkrunResult, time: 60 * 60 }, "Carlisle"),
    ).toBe(undefined);
  });
});
