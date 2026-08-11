import type { WorkItem } from "../state/types";

export function workItem(item: WorkItem, onArchive: (id: string) => void, onFocus: (id: string) => void): HTMLLIElement {
  const row = document.createElement("li");
  row.className = "item";
  row.dataset.itemId = item.id;
  const badge = document.createElement("span");
  badge.className = `state ${item.state.toLowerCase()}`;
  badge.textContent = item.state;
  const details = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = item.title;
  const meta = document.createElement("p");
  meta.textContent = `${item.id} · ${item.group}`;
  details.append(title, meta);
  const archive = document.createElement("button");
  archive.className = "action";
  archive.type = "button";
  archive.textContent = "Archive";
  archive.setAttribute("aria-label", `Archive ${item.title}`);
  archive.addEventListener("click", () => onArchive(item.id));
  archive.addEventListener("focus", () => onFocus(item.id));
  row.append(badge, details, archive);
  return row;
}
