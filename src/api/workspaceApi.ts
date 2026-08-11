import type { WorkItem } from "../state/types";
import { initialItems } from "../state/reducer";

export interface WorkspaceApi { listItems(): Promise<WorkItem[]>; }

export const fixtureApi: WorkspaceApi = {
  async listItems() { return structuredClone(initialItems); },
};
