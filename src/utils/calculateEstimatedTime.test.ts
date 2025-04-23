import { calculateEstimatedTime } from "./calculateEstimatedTime";

describe("calculateEstimatedTime", () => {
  it("calculates time correctly when SSS difference is zero", () => {
    expect(calculateEstimatedTime(30, 0, 1.4, 1.4)).toBe("30m 0s");
  });

  it("calculates time correctly for easier course", () => {
    expect(calculateEstimatedTime(30, 0, 1.6, 1.4)).toBe("29m 54s");
  });

  it("calculates time correctly for harder course", () => {
    expect(calculateEstimatedTime(30, 0, 1.4, 3.4)).toBe("31m 0s");
  });

  it("handles seconds correctly", () => {
    expect(calculateEstimatedTime(29, 30, 1.4, 1.5)).toBe("29m 33s");
  });
});
