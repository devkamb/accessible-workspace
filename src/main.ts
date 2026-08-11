import "./styles.css";

type Item = { id: string; title: string; group: string; state: "Ready" | "Review" | "Blocked" };
const items: Item[] = [
  { id: "DOC-241", title: "Search quality review", group: "Information retrieval", state: "Review" },
  { id: "DOC-240", title: "Translation evaluation", group: "Language systems", state: "Ready" },
  { id: "DOC-239", title: "Accessibility audit", group: "User experience", state: "Blocked" },
];
const app = document.querySelector<HTMLDivElement>("#app")!;

function render(filter: Item["state"] | "All" = "All") {
  const visible = filter === "All" ? items : items.filter(item => item.state === filter);
  app.innerHTML = `<main class="shell"><header><a class="brand" href="#main" aria-label="Workspace home"><span class="logo">W</span>Workspace</a><button class="profile" aria-label="Open profile menu">AK</button></header><div id="main" class="intro"><span class="eyebrow">PERSONAL WORKSPACE</span><h1>Make the next step clear.</h1><p class="muted">Review current work, focus attention, and keep decisions easy to find.</p></div><section class="toolbar" aria-label="Work filters"><label for="filter">Show</label><select id="filter"><option>All</option><option>Ready</option><option>Review</option><option>Blocked</option></select><span class="count" role="status" aria-live="polite">${visible.length} items</span></section><section class="list" aria-label="Work items">${visible.map(item => `<article class="item"><div class="state ${item.state.toLowerCase()}"><span aria-hidden="true"></span>${item.state}</div><div class="details"><h2>${item.title}</h2><p>${item.id} · ${item.group}</p></div><button class="open" aria-label="Open ${item.title}">Open <span aria-hidden="true">→</span></button></article>`).join("")}</section><p class="footnote">Use the filter to narrow the list. Every state is communicated by text and color.</p></main>`;
  const select = document.querySelector<HTMLSelectElement>("#filter")!;
  select.value = filter;
  select.addEventListener("change", event => render((event.target as HTMLSelectElement).value as Item["state"] | "All"));
}

render();
