import "./styles.css";
import { createWorkspaceApp } from "./app";

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("App root is missing");
createWorkspaceApp(root);
