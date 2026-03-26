import { dur } from "./parse.js";
import type { ValidDuration } from "./types.js";

/**
 * Add two durations and return the result in milliseconds.
 *
 * @example add("1h 30m", "45m") // 8_100_000
 */
export function add<A extends string, B extends string>(
  a: ValidDuration<A>,
  b: ValidDuration<B>,
): number {
  return dur(a) + dur(b);
}

/**
 * Subtract duration b from duration a and return the result in milliseconds.
 * Throws if result would be negative.
 *
 * @example sub("2h", "30m") // 5_400_000
 */
export function sub<A extends string, B extends string>(
  a: ValidDuration<A>,
  b: ValidDuration<B>,
): number {
  const result = dur(a) - dur(b);
  if (result < 0) {
    throw new Error(
      `Duration subtraction resulted in negative value: "${a as string}" - "${b as string}".`,
    );
  }
  return result;
}

/**
 * Compare two durations. Returns:
 * -  1 if a > b
 * -  0 if a === b
 * - -1 if a < b
 *
 * @example compare("1h", "30m") // 1
 */
export function compare<A extends string, B extends string>(
  a: ValidDuration<A>,
  b: ValidDuration<B>,
): -1 | 0 | 1 {
  const diff = dur(a) - dur(b);
  if (diff > 0) return 1;
  if (diff < 0) return -1;
  return 0;
}
