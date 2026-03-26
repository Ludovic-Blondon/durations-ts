import { describe, it, expect } from "vitest";
import { add, sub, compare } from "../src/arithmetic.js";

describe("add", () => {
  it("adds two durations", () => {
    expect(add("1h 30m", "45m")).toBe(8_100_000);
    expect(add("1d", "12h")).toBe(129_600_000);
  });

  it("handles zero", () => {
    expect(add("1h", "0s")).toBe(3_600_000);
  });
});

describe("sub", () => {
  it("subtracts durations", () => {
    expect(sub("2h", "30m")).toBe(5_400_000);
    expect(sub("1d", "12h")).toBe(43_200_000);
  });

  it("returns zero for equal durations", () => {
    expect(sub("1h", "60m")).toBe(0);
  });

  it("throws on negative result", () => {
    expect(() => sub("30m", "2h")).toThrow("negative");
  });
});

describe("compare", () => {
  it("returns 1 when a > b", () => {
    expect(compare("1h", "30m")).toBe(1);
  });

  it("returns -1 when a < b", () => {
    expect(compare("30m", "1h")).toBe(-1);
  });

  it("returns 0 when equal", () => {
    expect(compare("1h", "60m")).toBe(0);
    expect(compare("1d", "24h")).toBe(0);
  });
});
