# ADR-0002: One shared report stylesheet

**Status:** accepted (12 Sep 2026)

## Context

The lab-ledger unify pasted the same ~90-line theme block into both yearly
report shells. That reintroduces the copy-paste sharing ADR-0001 rejected for
JS: one accent tweak would need identical edits in two files (three counting
`index.html`'s hand-maintained twin).

## Decision

Theme lives in `shared/ledger.css`, linked from both reports. Each report keeps
a two-line inline `<style>` carrying only the sticky-tab anchor offset
(`scroll-padding-top`), so the offset and its Node test hook survive a
stylesheet-link failure.

`hero()` renders the kicker as a separate `<p class="kicker">` (landing-page
hierarchy) instead of prefixing the `h1`. Section/tab headings carry no emoji;
inline body-copy status markers stay — they encode pass/fail, not decoration.

## Consequences

- Theme edits happen once. Reports stay thin shells per ADR-0001.
- Reports depend on the stylesheet link at render; the inline offset is the
  only graceful-degradation carve-out.
- Column width stays 1100px vs the landing 880px — deliberate: data tables
  need the room. Recorded here so it isn't "fixed" later by accident.
