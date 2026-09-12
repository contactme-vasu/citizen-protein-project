import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Regression lock for the missing-comma outage (Sep 2026): an inline
// <script type="module"> with a syntax error kills its whole script — which
// left #modal unrendered and made the *second* script throw the misleading
// "addEventListener of null" error users actually saw. No test parsed the
// inline scripts, so nothing caught it.
//
// Trick: importing a data: URL executes it. Without a DOM these scripts must
// fail at *runtime* (document/window is not defined) — never at parse time.
// A SyntaxError here means a broken page.
for (const f of ["whey-protein-report.html", "old-protein-report.html"]) {
  test(`${f} inline modules are syntactically valid`, async () => {
    const html = readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
    const scripts = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)].map(
      (m) => m[1],
    );
    assert.ok(scripts.length > 0, "no inline module scripts found");
    for (const [i, code] of scripts.entries()) {
      const rewritten = code
        .replaceAll('"./shared/', `"${new URL("../shared/", import.meta.url).href}`)
        .replaceAll('"./data/', `"${new URL("../data/", import.meta.url).href}`);
      await assert.rejects(
        import("data:text/javascript," + encodeURIComponent(rewritten)),
        (err) => {
          assert.notEqual(
            err.constructor.name,
            "SyntaxError",
            `script ${i + 1} has a syntax error: ${err.message}`,
          );
          return true;
        },
      );
    }
  });
}
