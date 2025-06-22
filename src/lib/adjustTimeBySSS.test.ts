import { adjustTimeBySSS } from "./adjustTimeBySSS";

describe("adjustTimeBySSS", () => {
  it("does not adjust time when SSS is equal", () => {
    expect(adjustTimeBySSS(30 * 60, "Hove Promenade", "Long Eaton")).toBe(
      30 * 60,
    );
  });

  it("adjusts time correctly for slightly easier parkrun course", () => {
    expect(adjustTimeBySSS(30 * 60, "Oaklands", "Long Eaton")).toBe(
      29 * 60 + 54,
    );
  });

  it("adjusts time correctly for much harder parkrun course", () => {
    expect(adjustTimeBySSS(30 * 60 + 2, "Long Eaton", "Rostrevor")).toBe(
      32 * 60 + 22,
    );
  });

  it("outputs the same original time when inputs are reveresed", () => {
    expect(adjustTimeBySSS(32 * 60 + 22, "Rostrevor", "Long Eaton")).toBe(
      30 * 60 + 2,
    );
  });
});
