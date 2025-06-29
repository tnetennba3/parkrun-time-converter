import { findMostVisitedParkrun } from "./findMostVisitedParkrun";

import type { ParkrunResult } from "@/types";

describe("findMostVisitedParkrun", () => {
  it("returns the most visited parkrun", () => {
    const parkrunResults = [
      { date: "2025-05-10", time: 1450, parkrun: "Highbury Fields" } as const,
      { date: "2025-04-05", time: 1400, parkrun: "Bushy Park" } as const,
      { date: "2025-03-01", time: 1500, parkrun: "Highbury Fields" } as const,
    ];

    expect(findMostVisitedParkrun(parkrunResults)).toBe("Highbury Fields");
  });

  it("returns the more recently visited parkrun in the event of a tie", () => {
    const parkrunResults = [
      { date: "2025-06-21", time: 1200, parkrun: "Cardiff" } as const,
      { date: "2025-05-24", time: 1300, parkrun: "Carlisle" } as const,
      { date: "2025-05-17", time: 1400, parkrun: "Bushy Park" } as const,
      { date: "2025-05-10", time: 1450, parkrun: "Carlisle" } as const,
      { date: "2025-04-05", time: 1500, parkrun: "Bushy Park" } as const,
    ];

    expect(findMostVisitedParkrun(parkrunResults)).toBe("Carlisle");
  });

  it("returns undefined if there are no parkrun results", () => {
    const parkrunResults: ParkrunResult[] = [];

    expect(findMostVisitedParkrun(parkrunResults)).toBe(undefined);
  });
});
