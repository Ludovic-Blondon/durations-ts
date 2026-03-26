export type Unit = "ms" | "s" | "m" | "h" | "d" | "w";

export const UNIT_MS: Record<Unit, number> = {
  ms: 1,
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
  w: 604_800_000,
};

/** Units in descending order for humanize */
export const UNITS_DESC: readonly Unit[] = ["w", "d", "h", "m", "s", "ms"];

export const UNIT_LABELS: Record<Unit, { singular: string; plural: string }> = {
  ms: { singular: "millisecond", plural: "milliseconds" },
  s: { singular: "second", plural: "seconds" },
  m: { singular: "minute", plural: "minutes" },
  h: { singular: "hour", plural: "hours" },
  d: { singular: "day", plural: "days" },
  w: { singular: "week", plural: "weeks" },
};
