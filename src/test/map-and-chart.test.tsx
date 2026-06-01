import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { AnomalyDetectionPage } from '../pages/AnomalyDetectionPage';
import { LocalAnnotationStorage } from '../services/annotationStorage';
import { MockInspectionApi } from '../services/inspectionApi';

vi.mock('echarts-for-react', () => ({
  default: () => <div data-testid="echarts-instance" />,
}));

describe('map and water-quality visuals', () => {
  it('renders the local route map with the selected anomaly marker', async () => {
    render(
      <AnomalyDetectionPage
        api={new MockInspectionApi({ delayMs: 0 })}
        storage={new LocalAnnotationStorage(window.localStorage)}
      />,
    );

    expect(await screen.findByTestId('inspection-map')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '异常点 05，已选中' })).toBeInTheDocument();
  });

  it('renders the water-quality chart container', async () => {
    render(
      <AnomalyDetectionPage
        api={new MockInspectionApi({ delayMs: 0 })}
        storage={new LocalAnnotationStorage(window.localStorage)}
      />,
    );

    expect(await screen.findByTestId('water-quality-chart')).toBeInTheDocument();
    expect(screen.getByTestId('echarts-instance')).toBeInTheDocument();
  });
});
