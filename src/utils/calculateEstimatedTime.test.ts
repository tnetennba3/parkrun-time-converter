import { calculateEstimatedTime } from "./calculateEstimatedTime";

describe("calculateEstimatedTime", () => {
  it("calculates time correctly when SSS difference is zero", () => {
    expect(calculateEstimatedTime(30, 0, 1.4, 1.4)).toBe("30m 0s");
  });

  it("calculates time correctly for slightly easier course", () => {
    expect(calculateEstimatedTime(30, 0, 1.6, 1.4)).toBe("29m 54s");
  });

  it("calculates time correctly for much harder course", () => {
    expect(calculateEstimatedTime(30, 2, 1.4, 4.5)).toBe("32m 22s");
  });

  it("calculates the same original time when inputs are reveresed", () => {
    expect(calculateEstimatedTime(32, 22, 4.5, 1.4)).toBe("30m 2s");
  });
});
