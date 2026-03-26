import { Bench } from "tinybench";
import ms from "ms";
import parseDuration from "parse-duration";
import { dur } from "../src/parse.js";

const bench = new Bench({ time: 1000 });

bench
  .add("durations-ts: dur('2h 30m')", () => {
    dur("2h 30m");
  })
  .add("ms: ms('2h')", () => {
    ms("2h");
  })
  .add("parse-duration: parse('2h 30m')", () => {
    parseDuration("2h 30m");
  })
  .add("durations-ts: dur('500ms')", () => {
    dur("500ms");
  })
  .add("ms: ms('500ms')", () => {
    ms("500ms");
  })
  .add("durations-ts: dur('1w 2d 3h 4m 5s 6ms')", () => {
    dur("1w 2d 3h 4m 5s 6ms");
  })
  .add("parse-duration: parse('1w 2d 3h 4m 5s 6ms')", () => {
    parseDuration("1w 2d 3h 4m 5s 6ms");
  });

await bench.run();

console.log("\n📊 Benchmark Results\n");
console.table(
  bench.tasks.map((task) => ({
    Name: task.name,
    "ops/sec": Math.round(task.result!.hz).toLocaleString(),
    "avg (ns)": Math.round(task.result!.mean * 1_000_000).toLocaleString(),
    samples: task.result!.samples.length,
  })),
);
