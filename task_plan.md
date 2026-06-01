# MudSkipper-X AI Recognition UI Task Plan

## Goal
Build a polished frontend for the MudSkipper-X AI anomaly recognition and analysis interface in the current workspace. Keep durable project memory on disk so the later backend research can continue from the same decisions.

## Current Phase
Phase 1: Frontend requirements and visual design - awaiting user spec review

## Phases
| Phase | Status | Deliverable |
|---|---|---|
| 1. Frontend requirements and visual design | Awaiting review | Approved UI scope and design specification |
| 2. Frontend implementation plan | Pending | File-by-file implementation plan with verification steps |
| 3. Frontend scaffold and core dashboard | Pending | Runnable frontend with AI recognition dashboard |
| 4. Frontend interaction and responsive polish | Pending | Working filters, anomaly selection, report preview, responsive states |
| 5. Frontend verification and cleanup | Pending | Tests, visual verification, temporary-file cleanup |
| 6. Backend research | Pending | Backend architecture proposal based on the finished frontend contract |

## Confirmed Decisions
- The robot bottom-layer controller is ESP32.
- The baseline upload path should use ESP32-supported Wi-Fi.
- Bluetooth may be used for local setup or debugging if needed.
- 4G and LoRa are optional future extensions because they require additional modules.
- Enclosure rating is not finalized. The choice between IP65 and an immersion-capable rating remains open.
- The immediate task is frontend first. Backend design comes after the frontend contract is stable.
- Frontend milestone scope is option B: build a navigable system shell, fully implement the AI anomaly recognition page, and use visually consistent placeholders for the remaining navigation destinations.
- Frontend data strategy is local mock data behind an API adapter layer. UI components should depend on typed service interfaces so a backend can replace the mock source later.
- The primary visual reference is `图片/UI展示图.png`. The first implementation should closely reproduce its desktop dark-tech dashboard composition, proportions, information density, cyan borders, and anomaly-analysis layout rather than exploring alternate visual styles.
- The AI anomaly page interaction scope includes event selection, synchronized detail switching, risk-level filtering, and manual annotation with processing status and notes.
- The first map implementation uses a local static satellite image with an SVG overlay for the inspection route, normal points, anomaly markers, and current location. Keep the map isolated behind a component boundary so an online map adapter can replace it later.
- Responsive target is desktop-first: closely reproduce the `1536 x 1024` reference, adapt to common laptop widths, and show a simplified small-screen notice instead of implementing a full mobile dashboard in the first milestone.
- Manual anomaly annotations persist in browser `localStorage` through a storage adapter. Later backend integration should replace the adapter without changing page components.
- Frontend stack is React + TypeScript + Vite + ECharts + a custom CSS variable system. Use `lucide-react` for a consistent icon language.
- Approved page architecture: a navigable seven-item shell with a complete anomaly-detection page, desktop reference composition, and consistent placeholder destinations for the remaining modules.
- Approved data flow and interactions: mock API adapter, local annotation storage adapter, default highest-risk selection, synchronized detail switching and map highlighting, risk filtering, annotation editing, report-preview modal with browser printing, and explicit empty/error/small-screen states.
- Approved verification approach: automated behavior tests, reference-based browser visual review, desktop-width checks, narrow-screen notice verification, production build, and temporary-artifact cleanup.
- Project files should be created directly under the current workspace.
- Temporary files must be removed when no longer needed.

## Design Workflow
1. Clarify the first frontend milestone.
2. Compare 2-3 implementation and UI scope approaches.
3. Present the recommended design in sections and obtain approval.
4. Write a durable design specification.
5. Write an implementation plan.
6. Implement and verify the frontend.

## Errors Encountered
| Error | Attempt | Resolution |
|---|---|---|
| `rg.exe` failed with access denied | Initial workspace scan | Use native PowerShell file enumeration in this workspace. |
| Workspace is not a Git repository | Initial context scan | Keep planning files locally. Do not assume commit history is available. |
| Git reported `dubious ownership` for `F:/MudSkipper-X` | Repository initialization | Add this exact workspace path to Git `safe.directory`, then continue remote setup. |
| Local visual-companion URL could not be reached from the in-app browser; follow-up health checks timed out | Visual brainstorming | Stop relying on the companion server. Use `图片/UI展示图.png` as the direct reference and use the actual frontend dev server for later visual review. |
