// Product-presentation module: generic sort / filter / bar primitives shared
// by every yearly report. Pure string functions of dataset + selection —
// per-year row and Dossier templates stay in the yearly shells, where the
// content (and its Test panels) varies.

export function sortProducts(products, key, dir) {
  return [...products].sort((a, b) => {
    const x = a[key];
    const y = b[key];
    if (typeof x === "string") return dir * x.localeCompare(y);
    return dir * (x - y);
  });
}

export function filterProducts(products, { query = "", mode = "all" } = {}) {
  const q = query.toLowerCase();
  return products.filter((p) => {
    if (!(p.brand + " " + (p.s ?? p.c)).toLowerCase().includes(q)) return false;
    if (mode === "clean") return p.clean;
    if (mode === "nosugar") return p.suc === 0;
    return true;
  });
}

export function medal(i) {
  if (i === 0) return "🥇 ";
  if (i === 1) return "🥈 ";
  if (i === 2) return "🥉 ";
  return `#${i + 1} `;
}

export function barList(products, { value, max, cls = "", asc = false, min = 2, format = (v) => v } = {}) {
  const rows = [...products].sort((a, b) =>
    asc ? value(a) - value(b) : value(b) - value(a),
  );
  return rows
    .map((p) => {
      const v = value(p);
      const w = v === 0 ? 0 : Math.max(min, (100 * v) / max);
      const code = p.s ?? p.c;
      return `<div class="bar-row"><div><b>${code}</b> ${p.brand}</div><div class="bar-track"><div class="bar-fill ${cls}" style="width:${w}%"></div></div><div><b>${format(v, p)}</b></div></div>`;
    })
    .join("");
}
