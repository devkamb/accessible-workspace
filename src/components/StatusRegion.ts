export function statusRegion(count: number, filter: string): HTMLDivElement {
  const status = document.createElement("div");
  status.className = "status-region";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.textContent = `${count} ${count === 1 ? "item" : "items"} shown${filter === "All" ? "" : ` · ${filter}`}`;
  return status;
}
