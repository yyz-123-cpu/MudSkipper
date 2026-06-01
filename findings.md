# MudSkipper-X Findings

## Source Materials
- `MudSkipper_X_设计方案.pdf`: final 11-page design proposal and primary source of truth.
- `PDF文稿.txt`: earlier text draft. Useful for context but not authoritative where it differs from the final PDF.
- `图片/UI展示图.png`: direct visual reference for the requested AI recognition interface.
- `图片/系统架构与技术路线图.png`: four-layer system diagram.

## Product Understanding
MudSkipper-X is a biomimetic amphibious inspection robot for wetlands, aquaculture areas, and post-disaster shallow-water environments. It supports mud crawling, shallow-water swimming, and obstacle jumping.

The software chain is:

`sensor acquisition -> calibration and fusion -> environment recognition -> adaptive motion switching -> anomaly detection and geolocation -> Wi-Fi upload -> platform visualization -> inspection report`

## Confirmed Hardware And Communication Direction
- Use ESP32 as the bottom-layer controller.
- Base upload route: ESP32 Wi-Fi.
- Bluetooth is a reasonable local configuration or debugging channel if the frontend/backend design later requires it.
- 4G and LoRa are extension options only; both need additional hardware modules.

## Frontend Reference UI
The user explicitly selected `图片/UI展示图.png` as the direct visual target. The implementation should be a close desktop reproduction, not merely a loose style interpretation.

Visible modules:
- Left navigation: inspection overview, real-time monitoring, track playback, anomaly detection, water-quality monitoring, data reports, system settings.
- Route map: inspection path, normal locations, anomaly locations, current location.
- Water-quality trend chart: pH, turbidity, temperature, dissolved oxygen.
- Anomaly event list: event image, event ID, pollution severity, short description, timestamp.
- Selected anomaly detail: coordinates, discovery time, anomaly type, risk level, site images.
- Water-quality parameter panel and AI analysis conclusion.
- Inspection statistics: mileage, duration, anomaly count, normal point count.
- Report generation panel with a report identifier and view-report action.

## Visual Implementation Direction
- Reproduce the reference composition: narrow left navigation, top title bar, map and chart column, anomaly list and analysis column, and bottom statistics/report row.
- Preserve the dark navy background, cyan line work, thin bordered panels, compact typography, red/orange anomaly severity accents, and operational-screen density.
- Build real interactive frontend components behind the visual treatment; do not implement the page as one static image.

## Confirmed AI Anomaly Interaction Scope
- Selecting an anomaly updates the detail panel, water-quality values, site images, and AI analysis conclusion.
- Operators can filter anomalies by risk level.
- Operators can manually annotate an anomaly with a processing status and notes.

## Confirmed Map Direction
- Use a local static satellite-style base image for the first frontend milestone.
- Draw the patrol route, ordinary points, anomaly points, current point, and legend with an SVG overlay.
- Preserve a component boundary for a future online map implementation.

## Confirmed Responsive Scope
- Optimize for the reference image's `1536 x 1024` desktop composition.
- Allow the dashboard grid and panel sizing to adapt across common laptop widths.
- On small screens, show a clear simplified notice rather than compressing the dense monitoring dashboard into an unusable mobile layout.

## Confirmed Annotation Persistence
- Persist manual anomaly processing status and notes in browser `localStorage`.
- Keep persistence behind a storage adapter to make later backend replacement straightforward.

## Confirmed Frontend Stack
- React with TypeScript and Vite.
- ECharts for the water-quality trend chart.
- Custom CSS variables and scoped component styles for a close visual reproduction of the reference image.
- `lucide-react` for consistent SVG icons.

## Approved Page Architecture
- Navigable shell with seven left-side destinations: inspection overview, real-time monitoring, track playback, anomaly detection, water-quality monitoring, data reports, and system settings.
- The anomaly-detection destination is complete; the remaining destinations are visually consistent placeholders for later phases.
- Header includes product identity, page title, current time, Wi-Fi state, and battery state.
- Main anomaly page follows the reference composition: local satellite map and overlays on the upper left, ECharts water-quality trend on the lower left, filterable anomaly list on the upper right, selected anomaly analysis in the middle right, and inspection statistics plus report action on the lower right.
- Manual annotation editing lives in the selected anomaly analysis area.

## Approved Data Flow And Interactions
- Data boundary: `mockInspectionApi -> page state -> presentation components`.
- Persistence boundary: `annotationStorage -> localStorage`.
- Default selected event is the highest-risk anomaly.
- Event selection updates map emphasis, anomaly detail, site imagery, sensor values, and AI analysis copy.
- Risk filter options: all, high, medium, and low. If the active event is filtered out, select the first visible event.
- Manual status values: pending, in progress, reviewed, and closed. Notes persist with status.
- Report action opens an in-app preview modal and offers browser printing in the first milestone.
- Provide clear data-load failure, empty-filter-result, and small-screen states.

## Approved Verification Approach
- Automated tests cover default selection, event switching, risk filtering, empty results, annotation persistence, navigation, and report modal behavior.
- Visual verification compares the rendered dashboard against `图片/UI展示图.png` at `1536 x 1024`, checks common laptop widths, and confirms the narrow-screen notice.
- Engineering verification runs the test suite and production build, followed by browser interaction review and temporary-file cleanup.

## Requirement Gaps For Later Backend Research
- IP rating: IP65 versus an immersion-capable target such as IP68 or a dual test specification.
- Final sensor set: conductivity and dissolved oxygen inclusion.
- HTTP, polling, and WebSocket transport choice.
- User roles, permissions, report format, and offline behavior.

## Version Differences Found
- Final PDF text uses `ESP32 + Raspberry Pi`; an earlier draft and one visual mention STM32.
- Final PDF text mentions IP65; an exploded-view image mentions IP68.
- Final PDF text lists conductivity; the UI image shows dissolved oxygen.

## Local Development Environment Constraint
- The workspace is located on an exFAT USB drive (`F:`).
- Large dependency trees and concurrent writes are extremely slow on this volume.
- Keep source files and committed assets in the workspace, but run dependencies and temporary tooling from `C:\Users\yyz\.cache\mudskipper-x-runtime`.
- Keep Git metadata in `C:\Users\yyz\.cache\mudskipper-x-git\.git` while the worktree remains on `F:\MudSkipper-X`.
- Avoid concurrent filesystem-heavy operations on `F:`.
- A USB write interruption corrupted `findings.md` once. Git history and the on-disk memory files must be checked periodically.
- USB corruption later reached local Git objects and scaffold files. Active implementation now runs from the clean NTFS clone at `C:\Users\yyz\.cache\mudskipper-x-dev-fresh`; sync back to `F:` only after final verification.
- Final sync confirmed the USB filesystem itself needs repair: read-only `chkdsk F:` reports directory and volume-bitmap corruption with no bad sectors. Do not write to `F:` before an explicitly approved `chkdsk F: /F` repair.
