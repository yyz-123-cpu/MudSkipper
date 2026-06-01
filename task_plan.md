# MudSkipper-X AI Recognition UI Task Plan

## Goal
Build a polished frontend for the MudSkipper-X AI anomaly recognition and analysis interface in the current workspace. Keep durable project memory on disk so the later backend research can continue from the same decisions.

## Current Phase
Phase 2: Frontend implementation plan - complete; Phase 3 frontend scaffold - in progress

## Phases
| Phase | Status | Deliverable |
|---|---|---|
| 1. Frontend requirements and visual design | Complete | Approved UI scope and design specification |
| 2. Frontend implementation plan | Complete | File-by-file implementation plan with verification steps |
| 3. Frontend scaffold and core dashboard | In progress | Runnable frontend with AI recognition dashboard |
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
| `npm install` exceeded the initial two-minute command timeout; two broad PowerShell health checks also stalled | Frontend scaffold | Confirmed the npm registry responds. Use lightweight filesystem checks and a longer bounded install timeout instead of repeating broad process enumeration. |
| Partial `node_modules` remained on the exFAT workspace drive; recursive deletion exceeded ten minutes and the directory lacked complete Sharp/Vitest packages | Frontend scaffold | Isolate the partial directory and test an NTFS-backed dependency directory link before continuing installation. |
| exFAT workspace rejected a `node_modules` Junction with `Incorrect function` | Frontend scaffold | Try a directory symbolic link. If unsupported, run dependencies from an NTFS tool directory and map package resolution explicitly. |
| Directory symbolic link required administrator privilege; parallel lockfile generation caused asset/test commands to exceed their timeouts on exFAT | Frontend scaffold | Use the NTFS cache runner, keep project operations serial on `F:`, and avoid concurrent writes. |
| Git staging stalled while a partial dependency tree remained under the USB workspace and multiple Git scans overlapped | Frontend scaffold | Stop the stalled scans, move the partial dependency tree to `F:\MudSkipper-X-node_modules-partial-delete`, clear the stale index lock, and keep Git operations serial. |
| Desktop Git scans continued to contend for `.git/index.lock` on the USB drive | Frontend scaffold | Move Git metadata to `C:\Users\yyz\.cache\mudskipper-x-git\.git`, keep `F:\MudSkipper-X` as the worktree, and verify branch/remote integrity before continuing. |
| `findings.md` was corrupted by an interrupted USB write | Frontend scaffold | Remove the binary-corrupted file, reconstruct it from Git history and current context, and periodically verify memory-file encoding. |
| USB corruption reached local Git objects and scaffold files | Frontend scaffold | Clone a clean NTFS development worktree from GitHub, continue implementation there, and sync a verified final tree back to `F:` only after browser verification. |
| Production build reported Lucide prop narrowing and missing Vitest configuration types | Map and chart verification | Use Lucide's exported `LucideIcon`, include `vitest/globals`, and split Vite build configuration from Vitest test configuration. |
| Dashboard tests initialized real ECharts inside jsdom and failed because Canvas is unavailable | Map and chart verification | Mock `echarts-for-react` in the Vitest setup file; keep the real renderer for browser verification. |
