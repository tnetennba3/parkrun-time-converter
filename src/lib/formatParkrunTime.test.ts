import { formatParkrunTime } from "./formatParkrunTime";

describe("formatParkrunTime", () => {
  it("formats time in seconds to minutes and seconds (M:SS)", () => {
    expect(formatParkrunTime(30 * 60 + 15)).toBe("30:15");
  });

  it("formats time correctly when it is an hour exactly", () => {
    expect(formatParkrunTime(60 * 60)).toBe("60:00");
  });
});
