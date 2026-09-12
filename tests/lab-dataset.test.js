import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeWhey } from "../shared/lab-dataset.js";
import { WHEY_2025 } from "../data/whey-2025.js";

const byCode = (products, code) => products.find((p) => p.s === code);

test("normalises the full 2025 whey set to 8 clean Products", () => {
  const products = normalizeWhey(WHEY_2025);
  assert.equal(products.length, 8);
});

test("derives BCAA, leucine and lysine for S16", () => {
  // Hand-computed: 4.42 + 8.49 + 3.99
  const s16 = byCode(normalizeWhey(WHEY_2025), "S16");
  assert.equal(s16.bcaa, 16.9);
  assert.equal(s16.leu, 8.49);
  assert.equal(s16.lys, 9.69);
});

test("turns BLQ sucrose and taurine into zero, keeps detections", () => {
  const products = normalizeWhey(WHEY_2025);
  assert.equal(byCode(products, "S11").suc, 0);
  assert.equal(byCode(products, "S10").suc, 4.83);
  assert.equal(byCode(products, "S2").tau, 5.93);
  assert.equal(byCode(products, "S16").tau, 0);
});

test("marks only fully-clean Products clean", () => {
  const products = normalizeWhey(WHEY_2025);
  assert.equal(byCode(products, "S16").clean, true);
  assert.equal(byCode(products, "S11").clean, true);
  assert.equal(byCode(products, "S10").clean, false); // cadmium + sucrose
  assert.equal(byCode(products, "S2").clean, false); // steroids not tested
});

test("keeps transcribed lab values verbatim", () => {
  const products = normalizeWhey(WHEY_2025);
  assert.equal(byCode(products, "S32").protein, 80.22);
  assert.equal(byCode(products, "S2").protein, 57.16);
  assert.equal(byCode(products, "S33").cu, 0.531);
});
