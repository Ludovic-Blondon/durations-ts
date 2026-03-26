import { UNIT_MS } from "./constants.js";
import type { Unit } from "./constants.js";
import type { ValidDuration } from "./types.js";

const DURATION_SEGMENT = /(\d+(?:\.\d+)?)\s*(ms|s|m|h|d|w)/g;
const VALID_DURATION = /^[\d\s.mshwdMS]+$/;

/**
 * Parse a duration string into milliseconds.
 * Validated at compile-time via template literal types.
 *
 * @example dur("2h 30m") // 9_000_000
 */
export function dur<T extends string>(input: ValidDuration<T>): number {
  const s = (input as string).trim();

  if (s === "") {
    throw new Error(
      'Invalid duration: empty string. Expected format like "1h 30m", "500ms".',
    );
  }

  if (!VALID_DURATION.test(s)) {
    throw new Error(
      `Invalid duration: "${s}". Expected format like "1h 30m", "500ms".`,
    );
  }

  DURATION_SEGMENT.lastIndex = 0;
  let total = 0;
  let matched = false;
  let match: RegExpExecArray | null;

  while ((match = DURATION_SEGMENT.exec(s)) !== null) {
    const value = Number(match[1]);
    const unit = match[2] as Unit;

    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `Invalid duration value: "${String(match[1])}". Must be a non-negative finite number.`,
      );
    }

    const multiplier = UNIT_MS[unit];
    total += value * multiplier;
    matched = true;
  }

  if (!matched) {
    throw new Error(
      `Invalid duration: "${s}". No valid segments found. Expected format like "1h 30m", "500ms".`,
    );
  }

  return total;
}
