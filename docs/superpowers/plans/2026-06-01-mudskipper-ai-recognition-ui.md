# MudSkipper-X AI Recognition UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a tested, desktop-first React dashboard that closely reproduces `图片/UI展示图.png`, supports anomaly filtering and annotation persistence, and keeps backend-facing behavior behind adapters.

**Architecture:** Use a Vite React application with typed domain models. Keep inspection reads behind `InspectionApi`, annotation writes behind `AnnotationStorage`, and visual modules in focused components. The anomaly page owns selection and filter state while map, chart, list, analysis, annotation, and report components receive explicit props.

**Tech Stack:** React, TypeScript, Vite, ECharts, `echarts-for-react`, `lucide-react`, Vitest, React Testing Library, CSS variables.

---

## File Map

| Path | Responsibility |
|---|---|
| `package.json` | Scripts and frontend dependencies |
| `vite.config.ts` | Vite and Vitest configuration |
| `src/domain/inspection.ts` | Shared domain types and risk ordering |
| `src/data/mockInspectionData.ts` | Local inspection samples and anomaly events |
| `src/services/inspectionApi.ts` | Typed inspection API boundary and mock implementation |
| `src/services/annotationStorage.ts` | Typed browser annotation persistence boundary |
| `src/hooks/useInspectionDashboard.ts` | Loading, selection, filter, and annotation orchestration |
| `src/components/shell/AppShell.tsx` | Header, sidebar, clock, active navigation |
| `src/components/dashboard/*` | Map, chart, event list, analysis, annotation, stats, report |
| `src/pages/AnomalyDetectionPage.tsx` | Dashboard composition |
| `src/pages/PlaceholderPage.tsx` | Deferred destination state |
| `src/styles/*` | Tokens, global styles, shell and dashboard layout |
| `src/test/*` | Test setup and behavior tests |
| `scripts/create-ui-assets.mjs` | Mechanical crop generation from the approved reference image |
| `public/assets/*` | Local map and anomaly image assets |

### Task 1: Create The Frontend Skeleton

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/test/setup.ts`
- Create: `scripts/create-ui-assets.mjs`

- [x] Create Vite, TypeScript, Vitest, and asset-generation configuration.
- [x] Install `react`, `react-dom`, `echarts`, `echarts-for-react`, `lucide-react`, Vite, TypeScript, Vitest, `jsdom`, React Testing Library, and `sharp`.
- [x] Run `npm run assets` and verify local image crops exist under `public/assets/`.
- [x] Run `npm run test -- --run` and verify the empty test harness exits successfully.
- [x] Commit the scaffold.

### Task 2: Add Typed Inspection And Annotation Adapters

**Files:**
- Create: `src/domain/inspection.ts`
- Create: `src/data/mockInspectionData.ts`
- Create: `src/services/inspectionApi.ts`
- Create: `src/services/annotationStorage.ts`
- Create: `src/test/services.test.ts`

- [x] Write failing tests that expect the mock API to return four ordered anomalies and the storage adapter to persist annotations by anomaly identifier.
- [x] Run `npm run test -- --run src/test/services.test.ts` and verify failure because the adapters do not exist.
- [x] Implement shared models, risk ordering, mock data, `MockInspectionApi`, and `LocalAnnotationStorage`.
- [x] Run the service tests and verify they pass.
- [x] Commit the adapter layer.

### Task 3: Build The Navigable Application Shell

**Files:**
- Create: `src/App.tsx`
- Create: `src/components/shell/AppShell.tsx`
- Create: `src/pages/PlaceholderPage.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/shell.css`
- Create: `src/test/app-shell.test.tsx`

- [ ] Write a failing test that renders the shell on `异常检测`, clicks `实时监控`, and expects the deferred-module message.
- [ ] Run `npm run test -- --run src/test/app-shell.test.tsx` and verify failure because the shell does not exist.
- [ ] Implement the seven-item navigation, header clock, Wi-Fi state, battery state, placeholder page, and narrow-screen notice.
- [ ] Run the shell test and verify it passes.
- [ ] Commit the shell.

### Task 4: Implement Dashboard State And Event Interactions

**Files:**
- Create: `src/hooks/useInspectionDashboard.ts`
- Create: `src/pages/AnomalyDetectionPage.tsx`
- Create: `src/components/dashboard/Panel.tsx`
- Create: `src/components/dashboard/AnomalyEventList.tsx`
- Create: `src/components/dashboard/AnomalyAnalysis.tsx`
- Create: `src/styles/dashboard.css`
- Create: `src/test/anomaly-dashboard.test.tsx`

- [ ] Write failing tests for highest-risk default selection, event selection, risk filtering, and empty filter state.
- [ ] Run `npm run test -- --run src/test/anomaly-dashboard.test.tsx` and verify failure because the page does not exist.
- [ ] Implement dashboard orchestration, filter controls, event list, selected-event detail, loading state, and retryable error state.
- [ ] Run the dashboard tests and verify they pass.
- [ ] Commit dashboard state and list behavior.

### Task 5: Add The Local Map And Water-Quality Chart

**Files:**
- Create: `src/components/dashboard/InspectionMap.tsx`
- Create: `src/components/dashboard/WaterQualityChart.tsx`
- Modify: `src/pages/AnomalyDetectionPage.tsx`
- Modify: `src/styles/dashboard.css`
- Create: `src/test/map-and-chart.test.tsx`

- [ ] Write failing tests that expect the selected map marker and the chart container.
- [ ] Run `npm run test -- --run src/test/map-and-chart.test.tsx` and verify failure because the visual modules do not exist.
- [ ] Implement the local satellite crop, SVG route overlay, markers, legend, map scale, and ECharts trend module.
- [ ] Run the visual-module tests and verify they pass.
- [ ] Commit map and chart modules.

### Task 6: Add Manual Annotation And Report Preview

**Files:**
- Create: `src/components/dashboard/AnnotationEditor.tsx`
- Create: `src/components/dashboard/InspectionStats.tsx`
- Create: `src/components/dashboard/ReportPreviewModal.tsx`
- Modify: `src/components/dashboard/AnomalyAnalysis.tsx`
- Modify: `src/pages/AnomalyDetectionPage.tsx`
- Create: `src/test/annotation-and-report.test.tsx`

- [ ] Write failing tests that save an annotation, reload from storage, open the report preview, and close it.
- [ ] Run `npm run test -- --run src/test/annotation-and-report.test.tsx` and verify failure because annotation and report controls do not exist.
- [ ] Implement annotation editing, immediate status display, `localStorage` persistence, statistics, report identifier, preview dialog, print action, and close action.
- [ ] Run the annotation and report tests and verify they pass.
- [ ] Commit the operator workflow.

### Task 7: Complete Visual Styling And Responsive Behavior

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Modify: `src/styles/shell.css`
- Modify: `src/styles/dashboard.css`
- Modify: `src/components/dashboard/*`
- Create: `docs/verification/`

- [ ] Run the app with `npm run dev -- --host 0.0.0.0`.
- [ ] Capture and inspect the dashboard at `1536 x 1024`.
- [ ] Compare it against `图片/UI展示图.png` and adjust proportions, borders, spacing, typography, selected states, and panel density.
- [ ] Capture and inspect a common laptop viewport.
- [ ] Capture and inspect a narrow viewport and confirm the simplified notice replaces the dense console.
- [ ] Commit visual polish.

### Task 8: Verify, Clean, And Publish

**Files:**
- Modify: `progress.md`
- Modify: `task_plan.md`
- Keep: `docs/verification/` only when screenshots help document the result

- [ ] Run `npm run test -- --run`.
- [ ] Run `npm run build`.
- [ ] Review edited TSX files against React best practices.
- [ ] Remove temporary artifacts and verify ignored local caches are absent.
- [ ] Run `git status --short` and inspect the final diff.
- [ ] Commit verification records and push `main`.

## Plan Self-Review

- The plan covers shell navigation, anomaly selection, filtering, empty states, local map, ECharts chart, annotation persistence, report preview, responsive behavior, automated tests, browser verification, cleanup, and Git publication.
- Backend implementation remains outside this milestone.
- Adapter names are consistent: `InspectionApi`, `MockInspectionApi`, `AnnotationStorage`, and `LocalAnnotationStorage`.
- Presentation components never read raw mock data or `localStorage` directly.
