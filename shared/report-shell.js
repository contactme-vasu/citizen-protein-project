// Report-shell module: page chrome shared by every yearly report.
// Small interface: pure string render plus one scrollspy behavior.
// Yearly shells supply the data (their adapter); section bodies stay
// in the yearly shells.

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

export function initScrollSpy() {
  if (typeof document === "undefined") return () => {};
  const nav = document.querySelector("nav.tabs");
  if (!nav) return () => {};
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const targets = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (!links.length || !targets.length) return () => {};
  let current = "";
  const setActive = (id) => {
    if (!id || id === current) return;
    current = id;
    links.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === `#${id}`),
    );
    // Follow horizontally inside the sticky bar only — never move the page.
    const active = nav.querySelector("a.active");
    if (active && typeof nav.scrollTo === "function") {
      nav.scrollTo({
        left: active.offsetLeft - nav.clientWidth / 2 + active.clientWidth / 2,
      });
    }
  };
  // Immediate feedback on tap/click; the observer confirms it on scroll.
  nav.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a) setActive(a.getAttribute("href").slice(1));
  });
  // Deterministic rule: the active tab is the last section at/above the band.
  const pick = () => {
    const line = window.innerHeight * 0.3;
    let id = targets[0].id;
    for (const t of targets) {
      if (t.getBoundingClientRect().top <= line) id = t.id;
    }
    setActive(id);
  };
  const io = new IntersectionObserver(() => pick(), {
    rootMargin: "-30% 0px -60% 0px",
  });
  targets.forEach((t) => io.observe(t));
  return () => io.disconnect();
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
