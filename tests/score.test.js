import { test } from "node:test";
import assert from "node:assert/strict";
import { score } from "../shared/score.js";
import { normalizeWhey } from "../shared/lab-dataset.js";
import { WHEY_2025 } from "../data/whey-2025.js";

const products = normalizeWhey(WHEY_2025);
const codes = (ranked) => ranked.map((p) => p.s);

test("default weights reproduce the published whey verdicts", () => {
  const ranked = score(products, { protein: 35, amino: 30, purity: 10, safety: 25 });
  assert.deepEqual(codes(ranked).slice(0, 2), ["S16", "S32"]);
  assert.equal(codes(ranked).at(-1), "S2");
  assert.ok(ranked.at(-2).s === "S10");
});

test("protein-only weights crown the densest Product", () => {
  const ranked = score(products, { protein: 1, amino: 0, purity: 0, safety: 0 });
  assert.equal(ranked[0].s, "S32");
});

test("cadmium and sucrose sink S10 below its clean peers", () => {
  const ranked = score(products, { protein: 35, amino: 30, purity: 10, safety: 25 });
  const byCode = Object.fromEntries(ranked.map((p) => [p.s, p.score]));
  assert.ok(byCode.S10 < byCode.S11);
  assert.ok(byCode.S10 < byCode.S33);
});

test("zero total weight ranks nothing above anything else", () => {
  const ranked = score(products, { protein: 0, amino: 0, purity: 0, safety: 0 });
  assert.equal(ranked.length, 8);
  for (const p of ranked) assert.equal(p.score, 0);
});
