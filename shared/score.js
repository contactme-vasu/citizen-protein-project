// Score module: ranks Products from slider weights.
//
// score(products, weights, scorers): each weight key maps to a scorer that
// turns a Product into a 0..1 component. Defaults to the whey formula,
// ported verbatim from the whey report's rescore() (behaviour freeze).
// PROTEIN_2024_SCORE carries the 2024 formula, ported verbatim from the
// 2024 report's rescore(). Returns Products with a `score`, best first.

function wheySafety(p) {
  let safe = 1;
  if (/Cadmium|Lowest protein/.test(p.flags.join())) safe -= 0.45;
  if (/Progesterone/.test(p.flags.join())) safe -= 0.25;
  if (/No steroid/.test(p.flags.join())) safe -= 0.2;
  safe -= Math.min(0.25, (p.cu / 4.6) * 0.25);
  return Math.max(0, safe);
}

const WHEY_SCORE = {
  protein: (p) => p.protein / 85,
  amino: (p) => p.bcaa / 17.5,
  purity: (p) => (p.suc === 0 ? 1 : Math.max(0, 1 - p.suc / 5)),
  safety: wheySafety,
};

export const PROTEIN_2024_SCORE = {
  protein: (p) => p.det / 90,
  honesty: (p) => Math.max(0, 1 - Math.min(80, Math.abs(p.d)) / 80),
  safety: (p) => {
    let safe = 1;
    if (p.afl) safe -= 0.4;
    if (p.pest) safe -= 0.35;
    if (p.lead > 0) safe -= 0.2;
    if (p.cad > 0) safe -= 0.2;
    if (p.ars > 0) safe -= 0.15;
    if (p.cu > 10) safe -= 0.15;
    if (p.herb) safe -= 0.15;
    return Math.max(0, safe);
  },
  solvents: (p) => 1 - p.gcc / 90,
};

export function score(products, weights, scorers = WHEY_SCORE) {
  const keys = Object.keys(weights);
  const total = keys.reduce((t, k) => t + weights[k], 0) || 1;
  return products
    .map((p) => {
      const value =
        (100 *
          keys.reduce(
            (t, k) => t + weights[k] * (scorers[k] ? scorers[k](p) : 0),
            0,
          )) /
        total;
      return { ...p, score: +value.toFixed(1) };
    })
    .sort((a, b) => b.score - a.score);
}
