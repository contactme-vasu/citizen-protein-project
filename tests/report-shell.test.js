import { test } from "node:test";
import assert from "node:assert/strict";
import {
  pageHead,
  hero,
  tabNav,
  modalShell,
  pageFooter,
} from "../shared/report-shell.js";

test("pageHead carries the report title and viewport meta", () => {
  const out = pageHead({
    title: "Whey Protein Lab Report",
    css: ":root{}",
  });
  assert.match(out, /<title>Whey Protein Lab Report<\/title>/);
  assert.match(out, /name="viewport"/);
  assert.match(out, /:root\{\}/);
});

test("hero shows kicker, title, lede and every badge", () => {
  const out = hero({
    kicker: "🥛",
    title: "Whey Protein — Interactive Lab Analysis",
    lede: "Compiled from <b>8</b> lab reports.",
    badges: ["8 whey products analysed", "34 powders tested in total"],
  });
  assert.match(out, /Whey Protein — Interactive Lab Analysis/);
  assert.match(out, /Compiled from <b>8<\/b> lab reports\./);
  assert.match(out, /8 whey products analysed/);
  assert.match(out, /34 powders tested in total/);
  assert.match(out, /class="hero"/);
});

test("tabNav renders one anchor per tab with a single active", () => {
  const out = tabNav([
    { href: "#verdict", label: "🏆 Verdict", active: true },
    { href: "#compare", label: "📊 Compare" },
    { href: "#charts", label: "📈 Charts" },
  ]);
  assert.match(out, /href="#verdict"/);
  assert.match(out, /href="#compare"/);
  assert.match(out, /href="#charts"/);
  assert.match(out, /🏆 Verdict/);
  const actives = out.match(/class="active"/g) ?? [];
  assert.equal(actives.length, 1);
});

test("modalShell exposes the Dossier mount points", () => {
  const out = modalShell();
  assert.match(out, /id="modal"/);
  assert.match(out, /id="modalBody"/);
});

test("pageFooter carries the closing note", () => {
  const out = pageFooter({ note: "BLQ = below limit of quantification." });
  assert.match(out, /BLQ = below limit of quantification\./);
  assert.match(out, /<footer/);
});
