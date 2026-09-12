// Lab-dataset module: turns raw lab transcriptions into clean Products.
// Owns every transcription quirk so renderers never see raw lab strings:
// BLQ becomes zero, BCAA/leucine/lysine/clean are derived in one place.
//
// Panel display strings (hm/afl/st) pass through for the Dossier; their
// structured form moves here when the Dossier renderer does (ticket 04).
// Copper arrives as elemental mg/kg: the pesticide PDF's four copper-salt
// rows were unified at transcription time (verifiable against the PDF).

const BLQ = "BLQ";

function num(value) {
  return value === BLQ ? 0 : value;
}

function cleanOf(row, suc) {
  return (
    row.hm === "All BLQ" &&
    row.afl === "All BLQ" &&
    row.st === "All BLQ" &&
    suc === 0
  );
}

export function normalize2024(raw) {
  return raw.rows.map((row) => {
    const g = Object.keys(raw.groups).filter((k) =>
      raw.groups[k].includes(row.c),
    );
    return {
      ...row,
      d: +(((row.det - row.lab) / row.lab) * 100).toFixed(1),
      g,
      herb: raw.herbs[row.c] ?? "",
    };
  });
}

export function normalizeWhey(rawRows) {
  return rawRows.map((row) => {
    const suc = num(row.suc);
    const bcaa = +(
      row.aa.Isoleucine +
      row.aa.Leucine +
      row.aa.Valine
    ).toFixed(2);
    return {
      ...row,
      suc,
      tau: num(row.tau),
      bcaa,
      leu: row.aa.Leucine,
      lys: row.aa.Lysine,
      clean: cleanOf(row, suc),
    };
  });
}
