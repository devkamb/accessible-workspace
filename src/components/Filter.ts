import type { Filter } from "../state/types";

export function filterControl(value: Filter, onChange: (value: Filter) => void): HTMLSelectElement {
  const select = document.createElement("select");
  select.id = "filter";
  select.setAttribute("aria-label", "Filter work items by state");
  for (const optionValue of ["All", "Ready", "Review", "Blocked"] as Filter[]) {
    const option = new Option(optionValue, optionValue, false, optionValue === value);
    select.add(option);
  }
  select.addEventListener("change", () => onChange(select.value as Filter));
  return select;
}
