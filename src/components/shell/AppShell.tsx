import { useEffect, useState, type ComponentType, type PropsWithChildren } from 'react';
import {
  BatteryMedium,
  ClipboardList,
  Droplets,
  History,
  House,
  Radar,
  Settings,
  TriangleAlert,
  Wifi,
} from 'lucide-react';

export type DestinationId =
  | 'overview'
  | 'realtime'
  | 'track-playback'
  | 'anomaly-detection'
  | 'water-quality'
  | 'reports'
  | 'settings';

interface NavigationItem {
  id: DestinationId;
  label: string;
  pageTitle: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
}

export const navigationItems: NavigationItem[] = [
  { id: 'overview', label: '巡检总览', pageTitle: '巡检任务综合态势', icon: House },
  { id: 'realtime', label: '实时监控', pageTitle: '机器人实时监控', icon: Radar },
  { id: 'track-playback', label: '轨迹回放', pageTitle: '巡检轨迹回放', icon: History },
  { id: 'anomaly-detection', label: '异常检测', pageTitle: 'AI异常识别与分析报告', icon: TriangleAlert },
  { id: 'water-quality', label: '水质监测', pageTitle: '水质监测与趋势分析', icon: Droplets },
  { id: 'reports', label: '数据报告', pageTitle: '巡检数据报告中心', icon: ClipboardList },
  { id: 'settings', label: '系统设置', pageTitle: '系统设置', icon: Settings },
];

interface AppShellProps extends PropsWithChildren {
  activeDestination: DestinationId;
  onNavigate: (destination: DestinationId) => void;
}

function formatClock(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .format(date)
    .replace(/\//g, '-');
}

export function AppShell({ activeDestination, children, onNavigate }: AppShellProps) {
  const [clock, setClock] = useState(() => formatClock(new Date()));
  const activeItem = navigationItems.find((item) => item.id === activeDestination)!;

  useEffect(() => {
    const timer = window.setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="app-shell">
      <div className="small-screen-notice">
        <TriangleAlert size={28} />
        <strong>请使用桌面端查看巡检控制台</strong>
        <span>该页面包含高密度地图与分析面板，建议使用宽度不低于 960px 的屏幕。</span>
      </div>

      <header className="topbar">
        <div className="brand">
          <b>MudSkipper-X</b>
          <span>智能巡检系统</span>
        </div>
        <h1>{activeItem.pageTitle}</h1>
        <div className="device-status">
          <time>{clock}</time>
          <span className="status-divider" />
          <Wifi aria-label="Wi-Fi 已连接" size={19} />
          <span className="status-divider" />
          <BatteryMedium aria-label="设备电量 85%" size={22} />
          <span>85%</span>
        </div>
      </header>

      <aside className="sidebar">
        <nav aria-label="主导航">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeDestination === item.id;

            return (
              <button
                aria-current={isActive ? 'page' : undefined}
                className={`nav-item${isActive ? ' nav-item--active' : ''}`}
                key={item.id}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                <Icon size={24} strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="content-area">{children}</main>
    </div>
  );
}
