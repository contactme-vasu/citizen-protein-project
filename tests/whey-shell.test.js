import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(
  new URL("../whey-protein-report.html", import.meta.url),
  "utf8",
);

test("whey page mounts all chrome through the shell module", () => {
  for (const id of ["shell-hero", "shell-tabs", "shell-modal", "shell-footer"]) {
    assert.match(html, new RegExp(`id="${id}"`), `missing #${id}`);
  }
  assert.match(html, /\.\/shared\/report-shell\.js/);
  for (const fn of ["hero(", "tabNav(", "modalShell()", "pageFooter("]) {
    assert.ok(html.includes(fn), `missing ${fn} call`);
  }
});

test("whey page keeps no static chrome copy", () => {
  assert.ok(!html.includes('<header class="hero">'));
  assert.ok(!html.includes('<nav class="tabs"'));
});

test("whey page consumes the dataset module, holds no inline data", () => {
  assert.match(html, /\.\/shared\/lab-dataset\.js/);
  assert.match(html, /normalizeWhey\(WHEY_2025\)/);
  assert.ok(!html.includes('brand:"The Whole Truth Concentrate"'));
});

test("whey page scores through the Score module", () => {
  assert.match(html, /\.\/shared\/score\.js/);
  assert.match(html, /score\(P,\{protein:wP,amino:wA,purity:wS,safety:wF\}\)/);
});

test("whey page offsets anchors below the sticky nav", () => {
  assert.match(html, /scroll-padding-top:\d+px/);
});

test("whey page shows the module-failure fallback hook", () => {
  assert.match(html, /id="shell-fallback"/);
  assert.match(html, /__shellReady/);
});

test("whey verdict copy matches the displayed data", () => {
  assert.ok(html.includes("among the 8 eligible wheys"));
  assert.ok(!html.includes("among the 9 eligible wheys"));
  assert.ok(!html.includes("lysine and most other aminos are all #1"));
});

test("whey page keeps all sections and verdict content", () => {
  for (const s of [
    "verdict",
    "compare",
    "charts",
    "safety",
    "amino",
    "score",
    "method",
    "paper",
  ]) {
    assert.match(html, new RegExp(`id="${s}"`), `missing section #${s}`);
  }
  assert.ok(html.includes("S16 — The Whole Truth"));
  assert.ok(html.includes("78.24"));
  assert.ok(html.includes("8 whey products analysed"));
  assert.ok(html.includes("PMC12622730"));
});
