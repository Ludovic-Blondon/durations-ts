import { describe, it, expect } from "vitest";
import { toSeconds, toMinutes, toHours } from "../src/convert.js";

describe("toSeconds", () => {
  it("converts to seconds", () => {
    expect(toSeconds("5m")).toBe(300);
    expect(toSeconds("1h")).toBe(3_600);
    expect(toSeconds("500ms")).toBe(0.5);
  });
});

describe("toMinutes", () => {
  it("converts to minutes", () => {
    expect(toMinutes("2h 30m")).toBe(150);
    expect(toMinutes("1h")).toBe(60);
    expect(toMinutes("30s")).toBe(0.5);
  });
});

describe("toHours", () => {
  it("converts to hours", () => {
    expect(toHours("1d 12h")).toBe(36);
    expect(toHours("30m")).toBe(0.5);
    expect(toHours("2d")).toBe(48);
  });
});
