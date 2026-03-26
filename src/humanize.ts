import { UNITS_DESC, UNIT_MS, UNIT_LABELS } from "./constants.js";
import type { Unit } from "./constants.js";

export interface HumanizeOptions {
  verbose?: boolean;
  maxUnits?: number;
}

/**
 * Convert milliseconds to a human-readable duration string.
 *
 * @example humanize(9_000_000) // '2h 30m'
 * @example humanize(9_000_000, { verbose: true }) // '2 hours 30 minutes'
 */
export function humanize(ms: number, options?: HumanizeOptions): string {
  if (!Number.isFinite(ms) || ms < 0) {
    throw new Error(
      `Invalid milliseconds: ${String(ms)}. Must be a non-negative finite number.`,
    );
  }

  if (ms === 0) {
    return options?.verbose === true ? "0 milliseconds" : "0ms";
  }

  const verbose = options?.verbose === true;
  const maxUnits = options?.maxUnits ?? Infinity;
  const parts: string[] = [];
  let remaining = ms;

  for (const unit of UNITS_DESC) {
    if (parts.length >= maxUnits) break;

    const multiplier = UNIT_MS[unit];
    const count = Math.floor(remaining / multiplier);

    if (count > 0) {
      remaining -= count * multiplier;
      parts.push(formatUnit(count, unit, verbose));
    }
  }

  return parts.join(verbose ? " " : " ");
}

function formatUnit(count: number, unit: Unit, verbose: boolean): string {
  if (verbose) {
    const label =
      count === 1 ? UNIT_LABELS[unit].singular : UNIT_LABELS[unit].plural;
    return `${String(count)} ${label}`;
  }
  return `${String(count)}${unit}`;
}
