import { dur } from "./parse.js";
import type { ValidDuration } from "./types.js";

/**
 * Convert a duration string to seconds.
 *
 * @example toSeconds("5m") // 300
 */
export function toSeconds<T extends string>(input: ValidDuration<T>): number {
  return dur(input) / 1_000;
}

/**
 * Convert a duration string to minutes.
 *
 * @example toMinutes("2h 30m") // 150
 */
export function toMinutes<T extends string>(input: ValidDuration<T>): number {
  return dur(input) / 60_000;
}

/**
 * Convert a duration string to hours.
 *
 * @example toHours("1d 12h") // 36
 */
export function toHours<T extends string>(input: ValidDuration<T>): number {
  return dur(input) / 3_600_000;
}
