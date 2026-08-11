# Accessible Workspace

A keyboard-friendly TypeScript web interface for reviewing work items, filtering state, and inspecting a focused result without losing context.

## Run

```bash
npm install
npm run dev
```

## Design notes

- Semantic landmarks, labels, focus styles, and live status messaging support assistive technology.
- Filtering is a pure state transition around a typed record model.
- The network boundary is represented by a small adapter so the view can move from fixture data to a real API.
- The layout is responsive and avoids relying on color alone to communicate state.

## Accessibility checks

The interface uses semantic headings and landmarks, labeled controls, live result-count updates, visible keyboard focus, text labels in addition to status colors, and responsive layout behavior. A production review should add keyboard-only and screen-reader acceptance runs to CI and test the final browser build with automated accessibility tooling.

## Tests and build

`npm run build` runs TypeScript strict checking before producing the Vite bundle. The small UI state model is typed so API response changes surface during development.
