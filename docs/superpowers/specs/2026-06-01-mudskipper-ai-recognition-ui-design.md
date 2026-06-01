# MudSkipper-X AI Recognition UI Design

## 1. Objective

Build the first frontend milestone for the MudSkipper-X intelligent inspection system. The milestone is a desktop-first, high-fidelity implementation of the AI anomaly recognition and analysis dashboard shown in `图片/UI展示图.png`.

The page must be a real interactive frontend, not a static image reproduction. It will use local mock data and browser persistence while keeping adapter boundaries ready for later backend integration.

## 2. Scope

### Included

- A navigable application shell with seven destinations:
  - 巡检总览
  - 实时监控
  - 轨迹回放
  - 异常检测
  - 水质监测
  - 数据报告
  - 系统设置
- A complete 异常检测 page closely matching the supplied UI reference.
- Visually consistent placeholder pages for the other six destinations.
- Local mock inspection data behind a typed API adapter.
- Browser-persistent manual anomaly annotations behind a storage adapter.
- Responsive behavior for desktop and common laptop widths.
- A clear simplified notice on narrow screens.

### Excluded From This Milestone

- Real HTTP, WebSocket, ESP32, or Raspberry Pi connectivity.
- Online map SDK integration.
- User accounts, permissions, and authentication.
- Full mobile dashboard layouts.
- Server-side annotation persistence.
- PDF or spreadsheet report generation.
- Backend architecture implementation.

## 3. Product Context

MudSkipper-X is a biomimetic amphibious inspection robot for wetlands, aquaculture areas, and post-disaster shallow-water environments. The confirmed bottom-layer controller is ESP32. The baseline upload direction is ESP32-supported Wi-Fi. Bluetooth may later be used for local configuration or debugging. Optional 4G and LoRa extensions require additional modules and are outside the first frontend milestone.

The intended system chain is:

`sensor acquisition -> calibration and fusion -> environment recognition -> adaptive motion switching -> anomaly detection and geolocation -> Wi-Fi upload -> platform visualization -> inspection report`

## 4. Visual Direction

Use `图片/UI展示图.png` as the direct visual reference.

The dashboard should preserve:

- Dark navy background with subtle depth.
- Cyan-blue borders, lines, and active states.
- Compact operational-screen information density.
- Narrow left navigation rail.
- Centered top title and compact device status information.
- Thin bordered panels with restrained glow.
- Red, orange, and yellow anomaly severity accents.
- Dense but readable data presentation.

Do not flatten the design into a generic SaaS admin page. Do not reproduce the whole screen as a single image. Implement the visible modules as real components.

## 5. Frontend Technology

- React
- TypeScript
- Vite
- ECharts for the water-quality trend chart
- `lucide-react` for consistent SVG icons
- Custom CSS variables and component styles for the visual system
- Vitest and React Testing Library for automated behavior tests

## 6. Application Shell

The shell contains:

- Product identity: `MudSkipper-X 智能巡检系统`
- Page title derived from the active destination
- Current local time
- Wi-Fi state indicator
- Battery state indicator
- Left navigation with icon, text label, and active state

The default destination is `异常检测`.

The six non-primary destinations render placeholder pages that preserve the shell styling and explain that the module will be connected in a later milestone.

## 7. AI Anomaly Detection Page

### 7.1 Desktop Composition

Use the reference composition:

- Left column:
  - Upper panel: inspection map and route
  - Lower panel: water-quality trend chart
- Right column:
  - Upper panel: anomaly event list and risk filter
  - Middle panel: selected anomaly detail and analysis
  - Lower row: inspection statistics and report generation

### 7.2 Inspection Map

The first milestone uses a local satellite-style base image. Draw interactive overlays with SVG:

- Inspection route polyline
- Direction indicators
- Normal checkpoints
- Anomaly markers
- Current robot position
- Legend
- Scale label

Selecting an anomaly event emphasizes its matching map marker.

Keep the map implementation isolated behind its own component so a later online map adapter can replace it.

### 7.3 Water-Quality Trend Chart

Render a time-series chart with ECharts:

- pH
- Turbidity in NTU
- Temperature in degrees Celsius
- Dissolved oxygen in mg/L

The chart includes:

- Visible legend
- Readable axes and units
- Subtle grid lines
- Tooltip values
- A highlighted timestamp corresponding to the active anomaly when applicable

### 7.4 Anomaly Event List

Each list item includes:

- Thumbnail
- Event identifier
- Severity indicator
- Severity label
- Short description
- Timestamp
- Manual processing status when present

Risk filter values:

- 全部
- 高风险
- 中风险
- 低风险

The highest-risk event is selected by default. When filtering removes the active event, select the first visible result. If no events match, render an explicit empty state.

### 7.5 Selected Anomaly Detail

The detail area includes:

- Event identifier
- Severity
- Coordinates
- Discovery time
- Anomaly type
- Risk level
- Primary site image
- Supporting thumbnails
- Water-quality parameter values
- AI analysis conclusion
- Recommended handling steps
- Manual annotation action

Selecting a different event synchronizes the list, map highlight, site images, sensor values, and AI analysis.

### 7.6 Manual Annotation

Operators can edit:

- Processing status:
  - 待处理
  - 处理中
  - 已复核
  - 已关闭
- Notes

Annotations persist in browser `localStorage` through a storage adapter. Saving updates the list and detail area immediately. Later backend integration should replace the adapter without rewriting presentation components.

### 7.7 Inspection Statistics And Report Preview

Show:

- Inspection distance
- Inspection duration
- Anomaly count
- Normal checkpoint count
- Generated report identifier

`查看报告` opens a modal containing:

- Inspection summary
- Anomaly summary list
- Annotation statuses
- Print action using the browser print dialog
- Close action

Complex file export is outside this milestone.

## 8. Data Boundaries

Use typed domain models for:

- Navigation destination
- Inspection summary
- Route point
- Water-quality sample
- Anomaly event
- Risk level
- Annotation status
- Manual annotation

Use two replaceable adapters:

```text
mockInspectionApi -> page state -> presentation components
annotationStorage -> localStorage
```

Presentation components must not import raw mock data or call `localStorage` directly.

## 9. Responsive Behavior

Primary target: `1536 x 1024`.

Requirements:

- Closely reproduce the reference proportions at the primary target.
- Adapt panel sizing and spacing across common laptop widths.
- Avoid overlap, clipping, and horizontal overflow at supported desktop widths.
- On narrow screens, show a simplified notice that the monitoring console is optimized for desktop use.

A full mobile dashboard is outside scope.

## 10. States And Error Handling

Implement:

- Loading state while mock inspection data resolves.
- Data-load failure state with retry action.
- Empty anomaly-filter result state.
- Saved annotation feedback.
- Report modal close action.
- Small-screen notice.

## 11. Testing And Verification

### Automated Tests

- The highest-risk anomaly is selected by default.
- Selecting an event updates displayed detail.
- Filtering risk levels removes non-matching events and selects a valid visible result.
- An empty filter result renders the empty state.
- Manual annotation saves through the storage adapter and survives reload initialization.
- Left navigation switches between the complete anomaly page and placeholder destinations.
- Report preview opens and closes.

### Visual Verification

- Compare the implementation with `图片/UI展示图.png` at `1536 x 1024`.
- Check common laptop widths for clipping, overlap, and unreadable text.
- Check narrow viewport behavior for the simplified notice.
- Verify visual consistency of navigation, panels, severity states, chart, and modal.

### Engineering Verification

Run:

```powershell
npm run test
npm run build
```

Then perform a browser interaction check and remove temporary artifacts.

## 12. Future Backend Integration

After this frontend milestone is stable, research the backend around the interfaces established by the frontend:

- ESP32 Wi-Fi upload path
- Raspberry Pi edge-analysis responsibilities
- HTTP versus WebSocket transport
- Telemetry ingestion
- Image storage
- Annotation persistence
- Report generation
- Offline buffering and reconnect behavior

The frontend adapters should make this a data-source replacement exercise rather than a page rewrite.

