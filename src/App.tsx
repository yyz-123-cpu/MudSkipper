import { useState } from 'react';
import { AppShell, navigationItems, type DestinationId } from './components/shell/AppShell';
import { PlaceholderPage } from './pages/PlaceholderPage';
import './styles/tokens.css';
import './styles/global.css';
import './styles/shell.css';

export function App() {
  const [activeDestination, setActiveDestination] = useState<DestinationId>('anomaly-detection');
  const activeItem = navigationItems.find((item) => item.id === activeDestination)!;

  return (
    <AppShell activeDestination={activeDestination} onNavigate={setActiveDestination}>
      <PlaceholderPage
        description={activeItem.id === 'anomaly-detection' ? '异常识别仪表盘正在接入' : undefined}
        title={activeItem.label}
      />
    </AppShell>
  );
}
