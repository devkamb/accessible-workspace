export type WorkState = "Ready" | "Review" | "Blocked";
export type Filter = "All" | WorkState;

export type WorkItem = { id: string; title: string; group: string; state: WorkState };
export type WorkspaceState = { items: WorkItem[]; filter: Filter; query: string; focusedItemId: string | null };
export type Action =
  | { type: "set-filter"; filter: Filter }
  | { type: "set-query"; query: string }
  | { type: "archive-item"; itemId: string }
  | { type: "focus-item"; itemId: string | null };
