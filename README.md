# 🥛 Citizen Protein Project — Interactive Lab Reports

Public, interactive summaries of India's crowd-funded protein-powder lab testing
(MESH / Rajagiri Hospital, analysed by Eureka Analytical Services and Neogen Labs).

**Live site (after enabling GitHub Pages):** `https://<your-username>.github.io/<repo-name>/`

```
├── index.html                  ← landing page (start here)
├── whey-protein-report.html    ← 2025 report (8 wheys)
├── old-protein-report.html     ← 2024 report (36 powders)
├── sources/                    ← original lab PDFs + papers (evidence)
│   ├── 2025/lab-reports/       ← 8 Eureka Analytical Services PDFs
│   ├── 2025/paper/             ← published paper + master chart
│   └── 2024/                   ← 2024 paper + supplements
├── shared/                     ← JS modules imported by both reports
├── data/                       ← yearly dataset adapters
└── tests/                      ← Node tests (`node --test tests/`)
```

## 📊 Reports

| Report | File | Scope |
|---|---|---|
| **Whey 2025 — Concentrate & Blends** (latest) | [`whey-protein-report.html`](whey-protein-report.html) | 8 whey products from the 2025 study (34 powders). Protein, amino acids, sugar, taurine, heavy metals, aflatoxins, pesticides, steroids. Isolate-only products excluded. |
| **Protein 2024 — All 36 powders** | [`old-protein-report.html`](old-protein-report.html) | Original 2024 study: 36 powders (18 whey, 14 blends, 4 plant). Protein vs label, metals, aflatoxin, pesticides, GC-MS solvent scan. |

Start here → [`index.html`](index.html) (landing page linking both reports).

## 📚 Source studies

- **Project One (2024)** — Philips et al., *Medicine* 2024;103:14(e37724): [PMC10994440](https://pmc.ncbi.nlm.nih.gov/articles/PMC10994440/) · [MESH overview](https://meshindia.org/the-citizens-protein-project-one/)
- **Project Two (2025)** — Philips et al., *Medicine* 2025;104:46(e45970): [PMC12622730](https://pmc.ncbi.nlm.nih.gov/articles/PMC12622730/) · [MESH overview](https://meshindia.org/introducing-the-citizens-protein-project-two/)

## 🔬 Source data (in this repo)

All originals live under [`sources/`](sources/).

2025 study — 8 Eureka Analytical Services lab PDFs in [`sources/2025/lab-reports/`](sources/2025/lab-reports/):

- `protein-content.pdf` — protein content (all 34 powders)
- `sugar-and-amino-acids.pdf` — sugar + amino-acid profiles
- `taurine-content.pdf` — taurine (spiking check)
- `heavy-metals.pdf` — heavy metals (As, Pb, Cd, Hg)
- `fungal-toxins-aflatoxins.pdf` — aflatoxins B1/B2/G1/G2
- `pesticide-residues.pdf` — pesticide screen (~230 molecules)
- `steroids-hormones.pdf` — steroids / hormones
- `complete-scan-analysis.pdf` — GC-MS full scan

Published paper + master chart in [`sources/2025/paper/`](sources/2025/paper/):

- `medi-104-e45970.pdf` — Philips et al., *Medicine* 2025;104:46(e45970), "The Citizens Protein Project 2"
- `medi-104-e45970-s001.xlsx` — photographed master chart of all 34 procured packs

2024 study in [`sources/2024/`](sources/2024/):

- `paper-2024.pdf` — Philips et al., *Medicine* 2024;103:14(e37724)
- `supplement-master-chart.pdf` — Table 1 code ↔ brand mapping
- `supplement-methods.docx` — Kjeldahl/HPLC/ICP-MS protocols
- `supplement-gcms-list.xlsx` — GC-MS compound list (513 compounds)

## 🧩 Code layout

- `shared/` — report-shell, lab-dataset, score and presentation modules (small interfaces, imported by both reports)
- `data/` — yearly dataset adapters (`whey-2025.js`, `protein-2024.js`)
- `tests/` — Node tests over the module seams (`node --test tests/<file>`, with explicit file paths)
- `.scratch/architecture/` — spec, tickets and the browser re-verification prompt

## ⚠️ Disclaimer — please read

- These pages were built with the help of **LLMs/AI** to visualise and summarise public lab data. AI assistance means transcription or interpretation errors are possible — **verify all values against the linked originals** before acting on them.
- This is **not medical advice, not a product recommendation, and not an endorsement** of any brand.
- This is an **independent project with no affiliation** with MESH, Rajagiri Hospital, Eureka/Neogen labs, the study authors, or any supplement brand.
- One batch per brand was tested; batch-to-batch variation is real. For personal health decisions, consult a qualified professional.
- The author accepts **no liability** for any decision made using this site.

## 📜 License

Code/pages: [MIT](LICENSE). Underlying lab PDFs and papers belong to their
respective publishers/authors and are included here for reference.
