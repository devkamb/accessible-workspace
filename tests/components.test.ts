import { describe, expect, it } from "vitest";
import { filterControl } from "../src/components/Filter";
import { searchControl } from "../src/components/Search";
import { statusRegion } from "../src/components/StatusRegion";

describe("accessible controls", () => {
  it("exposes labels and live status", () => {
    document.body.innerHTML = "";
    const filter = filterControl("All", () => {});
    const search = searchControl("", () => {}, () => {});
    const status = statusRegion(2, "All");
    expect(filter.getAttribute("aria-label")).toContain("Filter");
    expect(search.getAttribute("aria-label")).toBe("Search work items");
    expect(status.getAttribute("aria-live")).toBe("polite");
  });
});
