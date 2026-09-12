# 🥛 Citizen Protein Project — Interactive Lab Reports

Public, interactive summaries of India's crowd-funded protein-powder lab testing
(MESH / Rajagiri Hospital, analysed by Eureka Analytical Services and Neogen Labs).

**Live site (after enabling GitHub Pages):** `https://<your-username>.github.io/<repo-name>/`

## 📊 Reports

| Report | File | Scope |
|---|---|---|
| **Whey 2025 — Concentrate & Blends** (latest) | [`whey-protein-report.html`](whey-protein-report.html) | 8 whey products from the 2025 study (34 powders). Protein, amino acids, sugar, taurine, heavy metals, aflatoxins, pesticides, steroids. Isolate-only products excluded. |
| **Protein 2024 — All 36 powders** | [`old-protein-report.html`](old-protein-report.html) | Original 2024 study: 36 powders (18 whey, 14 blends, 4 plant). Protein vs label, metals, aflatoxin, pesticides, GC-MS solvent scan. |

Start here → [`index.html`](index.html) (landing page linking both reports).

## 🔬 Source data (in this repo)

2025 study — 8 Eureka Analytical Services lab PDFs:

- `Protein-content-identified-34-powders.pdf`
- `sugar-content-and-Amino-acid-profile-of-all-powders.pdf`
- `Taurine-content-report-all-powders.pdf`
- `Heavy-metal-content-in-protein-powders.pdf`
- `Fungal-toxin-content-all-powders.pdf`
- `Pesticide-residue-reports.pdf`
- `Steroids-and-hormones-report.pdf`
- `Complete-scan-analysis-of-all-protein-powders.pdf`

Published paper + master chart:

- `medi-104-e45970.pdf` — Philips et al., *Medicine* 2025;104:46(e45970), "The Citizens Protein Project 2"
- `medi-104-e45970-s001.xlsx` — photographed master chart of all 34 procured packs

2024 study (see `Old Project/`):

- `Old Project/gen_report.py` — generator script for the 2024 report
- `Old Project/medi-103-e37724*.pdf/.docx/.xlsx` — Philips et al., *Medicine* 2024;103:14(e37724) + supplements

## ⚠️ Disclaimer

One batch per brand was tested; batch-to-batch variation is real.
These pages summarise lab numbers — they are not medical advice.
For personal health decisions, consult a qualified professional.

## 📜 License

Code/pages: [MIT](LICENSE). Underlying lab PDFs and papers belong to their
respective publishers/authors and are included here for reference.
