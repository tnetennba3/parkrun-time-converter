import { filterByDateRange } from "./filterByDateRange";

describe("filterByDateRange", () => {
  const parkrunResults = [
    { date: "2025-05-10", time: 1450, parkrun: "Highbury Fields" } as const,
    { date: "2025-04-05", time: 1400, parkrun: "Bushy Park" } as const,
    { date: "2024-03-01", time: 1500, parkrun: "Highbury Fields" } as const,
  ];

  it("returns all parkrun results when date range is set to 'All time'", () => {
    expect(filterByDateRange(parkrunResults, "allTime")).toBe(parkrunResults);
  });

  it("returns only results in the last twelve menths when date range is set to that", () => {
    expect(filterByDateRange(parkrunResults, "lastTwelveMonths")).toEqual([
      { date: "2025-05-10", time: 1450, parkrun: "Highbury Fields" } as const,
      { date: "2025-04-05", time: 1400, parkrun: "Bushy Park" } as const,
    ]);
  });
});
