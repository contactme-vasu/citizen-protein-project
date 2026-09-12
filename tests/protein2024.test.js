import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(
  new URL("../old-protein-report.html", import.meta.url),
  "utf8",
);

test("2024 page mounts all chrome through the shell module", () => {
  for (const id of ["shell-hero", "shell-tabs", "shell-modal", "shell-footer"]) {
    assert.match(html, new RegExp(`id="${id}"`), `missing #${id}`);
  }
  assert.match(html, /\.\/shared\/report-shell\.js/);
  for (const fn of ["hero(", "tabNav(", "modalShell()", "pageFooter("]) {
    assert.ok(html.includes(fn), `missing ${fn} call`);
  }
});

test("2024 page keeps no static chrome copy or inline data", () => {
  assert.ok(!html.includes('<header class="hero">'));
  assert.ok(!html.includes('<nav class="tabs"'));
  assert.ok(!html.includes('"c": 1, "brand"'));
});

test("2024 page consumes dataset, score and presentation modules", () => {
  assert.match(html, /normalize2024\(PROTEIN_2024\)/);
  assert.match(
    html,
    /score\(P,\{protein:wP,honesty:wA,safety:wS,solvents:wF\},PROTEIN_2024_SCORE\)/,
  );
  assert.ok(html.includes("sortProducts(r,sortK,sortD)"));
  assert.ok(html.includes("barList(P,"));
  assert.ok(html.includes("medal(i)"));
});

test("2024 page offsets anchors below the sticky nav", () => {
  assert.match(html, /scroll-padding-top:\d+px/);
});

test("2024 page shows the module-failure fallback hook", () => {
  assert.match(html, /id="shell-fallback"/);
  assert.match(html, /__shellReady/);
});

test("2024 page keeps all sections and verdict content", () => {
  for (const s of [
    "verdict",
    "compare",
    "charts",
    "safety",
    "gcms",
    "score",
    "method",
  ]) {
    assert.match(html, new RegExp(`id="${s}"`), `missing section #${s}`);
  }
  assert.ok(html.includes("Ultimate Nutrition Prostar"));
  assert.ok(html.includes("71.71"));
  assert.ok(html.includes("PMC10994440"));
});
