# durations-ts

[![CI](https://github.com/Ludovic-Blondon/durations-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/Ludovic-Blondon/durations-ts/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/durations-ts)](https://www.npmjs.com/package/durations-ts)
[![bundle size](https://img.shields.io/bundlephobia/minzip/durations-ts)](https://bundlephobia.com/package/durations-ts)
[![license](https://img.shields.io/npm/l/durations-ts)](./LICENSE)

Type-safe duration parsing with **compile-time validation**. Parse `'2h 30m'` to milliseconds with zero dependencies.

## Why durations-ts?

| Feature                         | `ms` (150M+ dl/week)  | `durations-ts`               |
| ------------------------------- | --------------------- | ---------------------------- |
| Compound durations (`'2h 30m'`) | No                    | Yes                          |
| Compile-time validation         | No                    | Yes                          |
| Return type                     | `number \| undefined` | `number` (throws on invalid) |
| Humanize                        | No                    | Yes                          |
| Arithmetic                      | No                    | Yes                          |
| Dependencies                    | 0                     | 0                            |

```ts
import { dur } from "durations-ts";

dur("2h 30m"); // 9_000_000 - OK
dur("5x"); // TS Error: "5x" is not a valid duration...
```

## Install

```bash
npm install durations-ts
```

## Quick Start

```ts
import {
  dur,
  humanize,
  add,
  sub,
  compare,
  toSeconds,
  toMinutes,
  toHours,
} from "durations-ts";

// Parse durations to milliseconds
dur("2h 30m"); // 9_000_000
dur("1.5h"); // 5_400_000
dur("1w 2d 3h"); // 788_400_000
dur("500ms"); // 500

// Humanize milliseconds to readable strings
humanize(9_000_000); // '2h 30m'
humanize(9_000_000, { verbose: true }); // '2 hours 30 minutes'
humanize(3_661_000, { maxUnits: 2 }); // '1h 1m'

// Arithmetic
add("1h 30m", "45m"); // 8_100_000
sub("2h", "30m"); // 5_400_000
compare("1h", "30m"); // 1

// Conversions
toSeconds("5m"); // 300
toMinutes("2h 30m"); // 150
toHours("1d 12h"); // 36
```

## API

### `dur<T>(input: ValidDuration<T>): number`

Parse a duration string into milliseconds. Validated at compile-time.

**Supported units:** `w` (weeks), `d` (days), `h` (hours), `m` (minutes), `s` (seconds), `ms` (milliseconds)

**Behavior:**

- Spaces between segments are optional: `'2h30m'` = `'2h 30m'`
- Duplicate units are summed: `'1h 2h'` = `'3h'`
- Order is free: `'30m 2h'` = `'2h 30m'`
- Decimals are supported: `'1.5h'` = `5_400_000`

### `humanize(ms: number, options?: HumanizeOptions): string`

Convert milliseconds to a human-readable string.

**Options:**

- `verbose?: boolean` - Use full words (`'2 hours 30 minutes'` instead of `'2h 30m'`)
- `maxUnits?: number` - Limit number of units displayed

### `add<A, B>(a: ValidDuration<A>, b: ValidDuration<B>): number`

Add two durations, returns milliseconds.

### `sub<A, B>(a: ValidDuration<A>, b: ValidDuration<B>): number`

Subtract duration b from a, returns milliseconds. Throws if result would be negative.

### `compare<A, B>(a: ValidDuration<A>, b: ValidDuration<B>): -1 | 0 | 1`

Compare two durations. Returns `1` if a > b, `0` if equal, `-1` if a < b.

### `toSeconds<T>(input: ValidDuration<T>): number`

Convert a duration string to seconds.

### `toMinutes<T>(input: ValidDuration<T>): number`

Convert a duration string to minutes.

### `toHours<T>(input: ValidDuration<T>): number`

Convert a duration string to hours.

## Type Safety

durations-ts uses TypeScript template literal types to validate duration strings **at compile time**:

```ts
dur("2h 30m"); // OK
dur("1.5h"); // OK
dur("5x"); // Error: "5x" is not a valid duration. Expected format like "1h 30m", "500ms", "2d 12h".
dur("hello"); // Error: "hello" is not a valid duration...
```

The types are also exported for your own use:

```ts
import type { IsValidDuration, ValidDuration } from "durations-ts";

type Check = IsValidDuration<"2h 30m">; // true
type Bad = IsValidDuration<"5x">; // false
```

> **Note:** `exactOptionalPropertyTypes` is enabled in our tsconfig. If you use our `HumanizeOptions` type, ensure your tsconfig has it enabled too, or pass explicit `undefined` values.

## Benchmarks

```
durations-ts: dur('2h 30m')              ~10,000,000 ops/sec
ms: ms('2h')                           ~21,000,000 ops/sec
parse-duration: parse('2h 30m')         ~2,700,000 ops/sec

durations-ts: dur('1w 2d 3h 4m 5s 6ms')  ~4,300,000 ops/sec
parse-duration: parse('1w 2d ...')      ~1,500,000 ops/sec
```

`ms` is faster for single units (it doesn't support compound). For compound durations, durations-ts is **~3.7x faster** than `parse-duration`.

Run benchmarks locally:

```bash
npm run bench
```

## License

[MIT](./LICENSE)
