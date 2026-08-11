import type { Action, WorkspaceState, WorkItem } from "./types";

export const initialItems: WorkItem[] = [
  { id: "DOC-241", title: "Search quality review", group: "Information retrieval", state: "Review" },
  { id: "DOC-240", title: "Translation evaluation", group: "Language systems", state: "Ready" },
  { id: "DOC-239", title: "Accessibility audit", group: "User experience", state: "Blocked" },
];

export const initialState: WorkspaceState = { items: initialItems, filter: "All", query: "", focusedItemId: null };

export function reducer(state: WorkspaceState, action: Action): WorkspaceState {
  switch (action.type) {
    case "set-filter": return { ...state, filter: action.filter };
    case "set-query": return { ...state, query: action.query };
    case "focus-item": return { ...state, focusedItemId: action.itemId };
    case "archive-item": return { ...state, items: state.items.filter(item => item.id !== action.itemId), focusedItemId: null };
  }
}

export function visibleItems(state: WorkspaceState): WorkItem[] {
  const query = state.query.trim().toLowerCase();
  return state.items.filter(item => (state.filter === "All" || item.state === state.filter) && (!query || `${item.title} ${item.group} ${item.id}`.toLowerCase().includes(query)));
}
