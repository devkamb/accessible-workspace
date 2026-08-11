import { describe, expect, it } from "vitest";
import { initialState, reducer, visibleItems } from "../src/state/reducer";

describe("workspace reducer", () => {
  it("filters by state and query", () => {
    const state = reducer(reducer(initialState, { type: "set-filter", filter: "Review" }), { type: "set-query", query: "search" });
    expect(visibleItems(state).map(item => item.id)).toEqual(["DOC-241"]);
  });

  it("archives an item and clears its focus target", () => {
    const state = reducer({ ...initialState, focusedItemId: "DOC-241" }, { type: "archive-item", itemId: "DOC-241" });
    expect(state.items.some(item => item.id === "DOC-241")).toBe(false);
    expect(state.focusedItemId).toBeNull();
  });
});
