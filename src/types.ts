/** Trims leading/trailing whitespace at type level */
type Trim<S extends string> = S extends ` ${infer R}`
  ? Trim<R>
  : S extends `${infer R} `
    ? Trim<R>
    : S;

/** Validates that a string is a valid duration format at compile time */
export type IsValidDuration<S extends string> =
  Trim<S> extends ""
    ? false // empty string is not valid
    : _ValidateSegments<Trim<S>, false>;

type _ValidateSegments<
  S extends string,
  HasSegment extends boolean,
> = S extends ""
  ? HasSegment // valid only if we parsed at least one segment
  : S extends `${number}ms${infer Rest}`
    ? _ValidateSegments<Trim<Rest>, true>
    : S extends `${number}s${infer Rest}`
      ? _ValidateSegments<Trim<Rest>, true>
      : S extends `${number}m${infer Rest}`
        ? _ValidateSegments<Trim<Rest>, true>
        : S extends `${number}h${infer Rest}`
          ? _ValidateSegments<Trim<Rest>, true>
          : S extends `${number}d${infer Rest}`
            ? _ValidateSegments<Trim<Rest>, true>
            : S extends `${number}w${infer Rest}`
              ? _ValidateSegments<Trim<Rest>, true>
              : false;

/** Branded type for validated duration strings */
export type ValidDuration<T extends string> =
  IsValidDuration<T> extends true ? T : ErrorMessage<T>;

/** Produces a readable compile-time error message */
type ErrorMessage<T extends string> =
  `Error: "${T}" is not a valid duration. Expected format like "1h 30m", "500ms", "2d 12h".`;
