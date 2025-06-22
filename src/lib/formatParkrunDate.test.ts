import { formatParkrunDate } from "./formatParkrunDate";

describe("formatParkrunDate", () => {
  it("formats parkrun date to an ISO 8601-compliant string", () => {
    expect(formatParkrunDate("28/08/2021")).toBe("2021-08-28");
  });
});
