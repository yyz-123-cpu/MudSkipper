import { useState } from 'react';
import { AppShell, navigationItems, type DestinationId } from './components/shell/AppShell';
import { AnomalyDetectionPage } from './pages/AnomalyDetectionPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { annotationStorage } from './services/annotationStorage';
import { inspectionApi } from './services/inspectionApi';
import './styles/tokens.css';
import './styles/global.css';
import './styles/shell.css';
import './styles/dashboard.css';

export function App() {
  const [activeDestination, setActiveDestination] = useState<DestinationId>('anomaly-detection');
  const activeItem = navigationItems.find((item) => item.id === activeDestination)!;

  return (
    <AppShell activeDestination={activeDestination} onNavigate={setActiveDestination}>
      {activeItem.id === 'anomaly-detection' ? (
        <AnomalyDetectionPage api={inspectionApi} storage={annotationStorage} />
      ) : (
        <PlaceholderPage title={activeItem.label} />
      )}
    </AppShell>
  );
}
