import { describe, it, expect } from "vitest";
import { dur } from "../src/parse.js";
import { humanize } from "../src/humanize.js";

describe("edge cases", () => {
  describe("overflow / large numbers", () => {
    it("handles very large values", () => {
      expect(dur("999w")).toBe(999 * 604_800_000);
      expect(dur("9999d")).toBe(9999 * 86_400_000);
    });

    it("humanizes large values", () => {
      const ms = 999 * 604_800_000;
      expect(humanize(ms)).toContain("w");
    });
  });

  describe("zero combinations", () => {
    it("handles zero with other values", () => {
      expect(dur("0h 30m")).toBe(1_800_000);
      expect(dur("0h 0m 0s")).toBe(0);
    });
  });

  describe("floating point precision", () => {
    it("handles common decimal cases", () => {
      expect(dur("0.1s")).toBe(100);
      expect(dur("0.001s")).toBe(1);
    });

    it("handles potential float imprecision", () => {
      // 0.1 + 0.2 !== 0.3 in JS, but we work with ms
      const result = dur("100ms");
      expect(result).toBe(100);
    });
  });

  describe("ms vs m/s ambiguity", () => {
    it("correctly distinguishes ms from m and s", () => {
      expect(dur("100ms")).toBe(100);
      expect(dur("1m")).toBe(60_000);
      expect(dur("1s")).toBe(1_000);
      expect(dur("1m 100ms")).toBe(60_100);
      expect(dur("1s 100ms")).toBe(1_100);
    });

    it("handles ms in compound durations", () => {
      expect(dur("1h 500ms")).toBe(3_600_500);
      expect(dur("1m 1s 1ms")).toBe(61_001);
    });
  });

  describe("whitespace variations", () => {
    it("handles tabs and multiple spaces", () => {
      expect(dur("1h  30m")).toBe(dur("1h 30m"));
    });

    it("handles leading/trailing whitespace", () => {
      expect(dur("  1h  ")).toBe(3_600_000);
    });
  });

  describe("negative/invalid runtime values", () => {
    it("throws on negative values bypassing types", () => {
      expect(() => dur("-5h" as never)).toThrow("Invalid duration");
    });
  });

  describe("repeated calls (regex lastIndex)", () => {
    it("produces consistent results across multiple calls", () => {
      expect(dur("1h")).toBe(3_600_000);
      expect(dur("1h")).toBe(3_600_000);
      expect(dur("1h")).toBe(3_600_000);
      expect(dur("2h 30m")).toBe(9_000_000);
      expect(dur("2h 30m")).toBe(9_000_000);
    });
  });
});
