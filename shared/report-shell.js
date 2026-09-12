// Report-shell module: page chrome shared by every yearly report.
// Small interface, pure string functions. Yearly shells supply the data
// (their adapter); section bodies stay in the yearly shells.

export function pageHead({ title, css }) {
  return [
    "<head>",
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `<title>${title}</title>`,
    `<style>${css}</style>`,
    "</head>",
  ].join("\n");
}

export function hero({ kicker, title, lede, badges }) {
  const badgeHtml = badges
    .map((b) => `<span class="badge">${b}</span>`)
    .join("");
  return [
    '<header class="hero">',
    '<div class="wrap">',
    `<h1>${kicker} ${title}</h1>`,
    `<p>${lede}</p>`,
    `<div class="badges">${badgeHtml}</div>`,
    "</div>",
    "</header>",
  ].join("\n");
}

export function tabNav(tabs) {
  const links = tabs
    .map(
      (t) =>
        `<a href="${t.href}"${t.active ? ' class="active"' : ""}>${t.label}</a>`,
    )
    .join("");
  return `<nav class="tabs" id="tabs">${links}</nav>`;
}

export function modalShell() {
  return [
    '<div id="modal"><div class="box">',
    '<button class="x" onclick="closeModal()">✕</button>',
    '<div id="modalBody"></div>',
    "</div></div>",
  ].join("");
}

export function pageFooter({ note }) {
  return `<footer><div class="wrap">${note}</div></footer>`;
}
