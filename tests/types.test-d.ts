import { expectTypeOf, describe, it } from "vitest";
import type { IsValidDuration } from "../src/types.js";

describe("IsValidDuration", () => {
  it("accepts valid single units", () => {
    expectTypeOf<IsValidDuration<"100ms">>().toEqualTypeOf<true>();
    expectTypeOf<IsValidDuration<"5s">>().toEqualTypeOf<true>();
    expectTypeOf<IsValidDuration<"30m">>().toEqualTypeOf<true>();
    expectTypeOf<IsValidDuration<"2h">>().toEqualTypeOf<true>();
    expectTypeOf<IsValidDuration<"7d">>().toEqualTypeOf<true>();
    expectTypeOf<IsValidDuration<"1w">>().toEqualTypeOf<true>();
  });

  it("accepts compound durations", () => {
    expectTypeOf<IsValidDuration<"2h 30m">>().toEqualTypeOf<true>();
    expectTypeOf<IsValidDuration<"1d 12h 30m">>().toEqualTypeOf<true>();
    expectTypeOf<IsValidDuration<"1w 2d 3h 4m 5s 6ms">>().toEqualTypeOf<true>();
  });

  it("accepts durations without spaces", () => {
    expectTypeOf<IsValidDuration<"2h30m">>().toEqualTypeOf<true>();
    expectTypeOf<IsValidDuration<"1d12h">>().toEqualTypeOf<true>();
  });

  it("accepts durations with extra whitespace", () => {
    expectTypeOf<IsValidDuration<" 2h 30m ">>().toEqualTypeOf<true>();
    expectTypeOf<IsValidDuration<"  5s  ">>().toEqualTypeOf<true>();
  });

  it("accepts decimal values", () => {
    expectTypeOf<IsValidDuration<"1.5h">>().toEqualTypeOf<true>();
    expectTypeOf<IsValidDuration<"0.5d">>().toEqualTypeOf<true>();
  });

  it("rejects empty strings", () => {
    expectTypeOf<IsValidDuration<"">>().toEqualTypeOf<false>();
    expectTypeOf<IsValidDuration<"  ">>().toEqualTypeOf<false>();
  });

  it("rejects invalid units", () => {
    expectTypeOf<IsValidDuration<"5x">>().toEqualTypeOf<false>();
    expectTypeOf<IsValidDuration<"10y">>().toEqualTypeOf<false>();
  });

  it("rejects bare numbers", () => {
    expectTypeOf<IsValidDuration<"100">>().toEqualTypeOf<false>();
  });

  it("rejects units without numbers", () => {
    expectTypeOf<IsValidDuration<"h">>().toEqualTypeOf<false>();
    expectTypeOf<IsValidDuration<"ms">>().toEqualTypeOf<false>();
  });

  it("rejects garbage strings", () => {
    expectTypeOf<IsValidDuration<"hello">>().toEqualTypeOf<false>();
    expectTypeOf<IsValidDuration<"2h foo">>().toEqualTypeOf<false>();
  });
});
