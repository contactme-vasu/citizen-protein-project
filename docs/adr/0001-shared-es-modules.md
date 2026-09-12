# ADR-0001: Shared ES modules behind thin report shells

**Status:** accepted (12 Sep 2026, grilling round 1, Q3)

## Context

Each yearly report is a self-contained HTML file with inline CSS and `<script>`.
The 2024 and 2025 reports duplicate the same shell: hero, tabs, modal, bar charts,
score sliders. The generator (`Old Project/gen_report.py`) embeds a third copy
as a string template.

## Decision

Deepen into shared ES modules (report-shell, lab-dataset, score,
product-presentation) with small interfaces, imported by thin per-year HTML
shells. Yearly datasets sit at the dataset seam as adapters.

## Consequences

- The "email someone a single file" property is lost; a report is now a shell
  plus its shared modules. Acceptable: reports are published as a directory,
  not attachments.
- Shell/dataset/score logic becomes testable in plain Node at its interfaces.
- Adding a future yearly report means writing data + section content only.

## Rejected

Single-file HTML with copy-paste sharing (keeps the duplication that caused
this refactor) and a build step producing single files (adds tooling for no
testability gain).
