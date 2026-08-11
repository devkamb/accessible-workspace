import type { WorkspaceApi } from "./api/workspaceApi";
import { fixtureApi } from "./api/workspaceApi";
import { filterControl } from "./components/Filter";
import { searchControl } from "./components/Search";
import { statusRegion } from "./components/StatusRegion";
import { workItemList } from "./components/WorkItemList";
import { initialState, reducer, visibleItems } from "./state/reducer";
import type { Action, WorkspaceState } from "./state/types";

export async function createWorkspaceApp(root: HTMLElement, api: WorkspaceApi = fixtureApi): Promise<void> {
  let state: WorkspaceState = { ...initialState, items: await api.listItems() };
  const announce = document.createElement("div");
  announce.className = "sr-only";
  root.replaceChildren();

  function dispatch(action: Action) {
    const previousVisible = visibleItems(state);
    state = reducer(state, action);
    render();
    if (action.type === "archive-item") {
      const next = visibleItems(state)[Math.min(previousVisible.findIndex(item => item.id === action.itemId), visibleItems(state).length - 1)];
      if (next) document.querySelector<HTMLButtonElement>(`[data-item-id="${next.id}"] button`)?.focus();
      else document.querySelector<HTMLInputElement>("#search")?.focus();
    }
  }

  function render() {
    const items = visibleItems(state);
    const shell = document.createElement("main");
    shell.className = "shell";
    shell.id = "main-content";
    const header = document.createElement("header");
    const brand = document.createElement("a");
    brand.className = "brand";
    brand.href = "#main-content";
    brand.textContent = "Workspace";
    const profile = document.createElement("button");
    profile.className = "profile";
    profile.type = "button";
    profile.textContent = "AK";
    profile.setAttribute("aria-label", "Open profile menu");
    header.append(brand, profile);
    const intro = document.createElement("section");
    intro.className = "intro";
    intro.setAttribute("aria-labelledby", "page-title");
    intro.innerHTML = `<span class="eyebrow">PERSONAL WORKSPACE</span><h1 id="page-title">Make the next step clear.</h1><p class="muted">Review current work, focus attention, and keep decisions easy to find.</p>`;
    const toolbar = document.createElement("section");
    toolbar.className = "toolbar";
    toolbar.setAttribute("aria-label", "Work item controls");
    const searchLabel = document.createElement("label");
    searchLabel.htmlFor = "search";
    searchLabel.textContent = "Search";
    toolbar.append(searchLabel, searchControl(state.query, value => dispatch({ type: "set-query", query: value }), () => dispatch({ type: "set-query", query: "" })), filterControl(state.filter, value => dispatch({ type: "set-filter", filter: value })));
    toolbar.append(statusRegion(items.length, state.filter));
    const list = workItemList(items, id => dispatch({ type: "archive-item", itemId: id }), id => dispatch({ type: "focus-item", itemId: id }));
    shell.append(header, intro, toolbar, list);
    root.replaceChildren(shell, announce);
  }
  render();
}
