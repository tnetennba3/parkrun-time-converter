import { parseParkrunTime } from "./parseParkrunTime";

describe("parseParkrunTime", () => {
  it("parses a parkrun time with minutes and seconds", () => {
    expect(parseParkrunTime("30:15")).toBe(1815);
  });

  it("parses a parkrun time with hours, minutes and seconds", () => {
    expect(parseParkrunTime("1:02:00")).toBe(3720);
  });
});
