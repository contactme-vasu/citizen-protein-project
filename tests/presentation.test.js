import { test } from "node:test";
import assert from "node:assert/strict";
import {
  sortProducts,
  filterProducts,
  barList,
  medal,
} from "../shared/presentation.js";
import { normalizeWhey, normalize2024 } from "../shared/lab-dataset.js";
import { score, PROTEIN_2024_SCORE } from "../shared/score.js";
import { WHEY_2025 } from "../data/whey-2025.js";
import { PROTEIN_2024 } from "../data/protein-2024.js";

const whey = normalizeWhey(WHEY_2025);

test("sortProducts orders by key and direction", () => {
  const desc = sortProducts(whey, "protein", -1);
  assert.equal(desc[0].s, "S32");
  assert.equal(desc.at(-1).s, "S2");
  const asc = sortProducts(whey, "protein", 1);
  assert.equal(asc[0].s, "S2");
  const brands = sortProducts(whey, "brand", 1);
  assert.ok(brands[0].brand.startsWith("BYBV"));
});

test("filterProducts narrows by query and mode", () => {
  assert.deepEqual(
    filterProducts(whey, { query: "truth", mode: "all" }).map((p) => p.s),
    ["S16"],
  );
  assert.equal(filterProducts(whey, { query: "", mode: "clean" }).length, 6);
  assert.equal(filterProducts(whey, { query: "", mode: "nosugar" }).length, 7);
});

test("barList emits one labelled row per Product, widest first", () => {
  const html = barList(whey, { value: (p) => p.protein, max: 85, cls: "" });
  assert.ok(html.includes("S32"));
  assert.ok(html.indexOf("S32") < html.indexOf("S2"));
  // S32 width: 80.22/85*100 = 94.38%
  assert.match(html, /width:94\.376\d*%/);
});

test("zero values render zero-width bars", () => {
  const html = barList(
    [{ s: "T", brand: "t", v: 0 }],
    { value: (p) => p.v, max: 5 },
  );
  assert.match(html, /width:0%/);
});

test("medal ranks the podium", () => {
  assert.equal(medal(0), "🥇 ");
  assert.equal(medal(1), "🥈 ");
  assert.equal(medal(2), "🥉 ");
  assert.equal(medal(3), "#4 ");
});

test("normalize2024 derives label honesty for all 36 Products", () => {
  const products = normalize2024(PROTEIN_2024);
  assert.equal(products.length, 36);
  const byCode = Object.fromEntries(products.map((p) => [p.c, p]));
  assert.equal(byCode[12].d, -13.6);
  assert.equal(byCode[25].d, -76.1);
  assert.equal(byCode[21].d, 18);
});

test("2024 config reproduces the published 2024 verdicts", () => {
  const products = normalize2024(PROTEIN_2024);
  const ranked = score(
    products,
    { protein: 30, honesty: 25, safety: 30, solvents: 15 },
    PROTEIN_2024_SCORE,
  );
  const codes = ranked.map((p) => p.c);
  assert.ok(codes.indexOf(12) < codes.indexOf(6));
  const bottom = codes.slice(-4);
  assert.ok(bottom.includes(29));
  assert.ok(bottom.includes(17));
});
