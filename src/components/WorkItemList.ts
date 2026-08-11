import type { WorkItem } from "../state/types";
import { workItem } from "./WorkItem";

export function workItemList(items: WorkItem[], onArchive: (id: string) => void, onFocus: (id: string) => void): HTMLUListElement {
  const list = document.createElement("ul");
  list.className = "list";
  list.setAttribute("aria-label", "Work items");
  for (const item of items) list.append(workItem(item, onArchive, onFocus));
  return list;
}
