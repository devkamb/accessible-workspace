export function searchControl(value: string, onChange: (value: string) => void, onEscape: () => void): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "search";
  input.id = "search";
  input.placeholder = "Search work items";
  input.setAttribute("aria-label", "Search work items");
  input.value = value;
  input.addEventListener("input", () => onChange(input.value));
  input.addEventListener("keydown", event => { if (event.key === "Escape") { input.value = ""; onEscape(); } });
  return input;
}
