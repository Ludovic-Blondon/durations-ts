import { describe, it, expect } from "vitest";
import { dur } from "../src/parse.js";

describe("dur", () => {
  describe("single units", () => {
    it("parses milliseconds", () => {
      expect(dur("100ms")).toBe(100);
      expect(dur("0ms")).toBe(0);
      expect(dur("1ms")).toBe(1);
    });

    it("parses seconds", () => {
      expect(dur("1s")).toBe(1_000);
      expect(dur("30s")).toBe(30_000);
    });

    it("parses minutes", () => {
      expect(dur("1m")).toBe(60_000);
      expect(dur("5m")).toBe(300_000);
    });

    it("parses hours", () => {
      expect(dur("1h")).toBe(3_600_000);
      expect(dur("2h")).toBe(7_200_000);
    });

    it("parses days", () => {
      expect(dur("1d")).toBe(86_400_000);
      expect(dur("7d")).toBe(604_800_000);
    });

    it("parses weeks", () => {
      expect(dur("1w")).toBe(604_800_000);
      expect(dur("2w")).toBe(1_209_600_000);
    });
  });

  describe("compound durations", () => {
    it("parses multiple units with spaces", () => {
      expect(dur("2h 30m")).toBe(9_000_000);
      expect(dur("1d 12h")).toBe(129_600_000);
      expect(dur("1h 30m 15s")).toBe(5_415_000);
    });

    it("parses multiple units without spaces", () => {
      expect(dur("2h30m")).toBe(9_000_000);
      expect(dur("1d12h")).toBe(129_600_000);
    });

    it("handles all units combined", () => {
      expect(dur("1w 2d 3h 4m 5s 6ms")).toBe(
        604_800_000 + 172_800_000 + 10_800_000 + 240_000 + 5_000 + 6,
      );
    });
  });

  describe("decimals", () => {
    it("parses decimal values", () => {
      expect(dur("1.5h")).toBe(5_400_000);
      expect(dur("0.5d")).toBe(43_200_000);
      expect(dur("2.5s")).toBe(2_500);
    });
  });

  describe("whitespace handling", () => {
    it("trims leading/trailing whitespace", () => {
      expect(dur(" 2h ")).toBe(7_200_000);
      expect(dur("  5m  ")).toBe(300_000);
    });

    it("handles multiple spaces between units", () => {
      expect(dur("2h  30m")).toBe(9_000_000);
    });
  });

  describe("duplicate units (sum behavior)", () => {
    it("sums duplicate units", () => {
      expect(dur("1h 2h")).toBe(10_800_000);
      expect(dur("30m 30m")).toBe(3_600_000);
    });

    it("handles any order", () => {
      expect(dur("30m 2h")).toBe(9_000_000);
    });
  });

  describe("zero values", () => {
    it("handles zero", () => {
      expect(dur("0s")).toBe(0);
      expect(dur("0h")).toBe(0);
      expect(dur("0ms")).toBe(0);
    });
  });

  describe("error cases", () => {
    it("throws on empty string", () => {
      expect(() => dur("" as never)).toThrow("empty string");
    });

    it("throws on whitespace only", () => {
      expect(() => dur("   " as never)).toThrow("empty string");
    });

    it("throws on invalid input", () => {
      expect(() => dur("hello" as never)).toThrow("Invalid duration");
    });

    it("throws on bare numbers", () => {
      expect(() => dur("100" as never)).toThrow("No valid segments");
    });
  });
});
