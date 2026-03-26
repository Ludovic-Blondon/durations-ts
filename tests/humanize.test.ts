import { describe, it, expect } from "vitest";
import { humanize } from "../src/humanize.js";

describe("humanize", () => {
  describe("short format (default)", () => {
    it("returns compact representation", () => {
      expect(humanize(9_000_000)).toBe("2h 30m");
      expect(humanize(3_600_000)).toBe("1h");
      expect(humanize(60_000)).toBe("1m");
      expect(humanize(1_000)).toBe("1s");
      expect(humanize(1)).toBe("1ms");
    });

    it("handles complex durations", () => {
      expect(humanize(90_061_001)).toBe("1d 1h 1m 1s 1ms");
    });

    it("handles weeks", () => {
      expect(humanize(604_800_000)).toBe("1w");
      expect(humanize(1_209_600_000)).toBe("2w");
    });
  });

  describe("verbose format", () => {
    it("returns full words", () => {
      expect(humanize(9_000_000, { verbose: true })).toBe("2 hours 30 minutes");
      expect(humanize(3_600_000, { verbose: true })).toBe("1 hour");
      expect(humanize(1_000, { verbose: true })).toBe("1 second");
      expect(humanize(2_000, { verbose: true })).toBe("2 seconds");
    });

    it("handles singular vs plural", () => {
      expect(humanize(1, { verbose: true })).toBe("1 millisecond");
      expect(humanize(2, { verbose: true })).toBe("2 milliseconds");
      expect(humanize(60_000, { verbose: true })).toBe("1 minute");
      expect(humanize(86_400_000, { verbose: true })).toBe("1 day");
      expect(humanize(604_800_000, { verbose: true })).toBe("1 week");
    });
  });

  describe("maxUnits option", () => {
    it("limits number of units displayed", () => {
      expect(humanize(3_661_000, { maxUnits: 2 })).toBe("1h 1m");
      expect(humanize(3_661_000, { maxUnits: 1 })).toBe("1h");
    });

    it("works with verbose", () => {
      expect(humanize(3_661_000, { maxUnits: 2, verbose: true })).toBe(
        "1 hour 1 minute",
      );
    });
  });

  describe("zero", () => {
    it("returns 0ms for zero", () => {
      expect(humanize(0)).toBe("0ms");
    });

    it("returns verbose zero", () => {
      expect(humanize(0, { verbose: true })).toBe("0 milliseconds");
    });
  });

  describe("error cases", () => {
    it("throws on negative values", () => {
      expect(() => humanize(-1)).toThrow("non-negative");
    });

    it("throws on NaN", () => {
      expect(() => humanize(NaN)).toThrow("non-negative");
    });

    it("throws on Infinity", () => {
      expect(() => humanize(Infinity)).toThrow("non-negative");
    });
  });
});
