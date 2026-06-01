import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockInspectionData } from '../data/mockInspectionData';
import type { InspectionApi } from '../services/inspectionApi';
import { MockInspectionApi } from '../services/inspectionApi';
import { LocalAnnotationStorage } from '../services/annotationStorage';
import { AnomalyDetectionPage } from '../pages/AnomalyDetectionPage';

function renderPage(api: InspectionApi = new MockInspectionApi({ delayMs: 0 })) {
  return render(
    <AnomalyDetectionPage api={api} storage={new LocalAnnotationStorage(window.localStorage)} />,
  );
}

describe('anomaly detection dashboard', () => {
  it('selects the highest-risk anomaly by default', async () => {
    renderPage();

    expect(await screen.findByRole('button', { name: '查看异常点 05' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByText('23.156789°N, 113.324567°E')).toBeInTheDocument();
  });

  it('updates the selected detail when an event is clicked', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole('button', { name: '查看异常点 03' }));

    expect(screen.getByText('23.168942°N, 113.298421°E')).toBeInTheDocument();
  });

  it('filters events by risk and selects a visible result', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole('button', { name: '中风险' }));

    expect(screen.queryByRole('button', { name: '查看异常点 05' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '查看异常点 03' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('renders an explicit empty state when no filtered anomalies remain', async () => {
    const user = userEvent.setup();
    const api: InspectionApi = {
      getInspection: async () => ({
        ...mockInspectionData,
        anomalies: mockInspectionData.anomalies.filter((event) => event.risk === 'high'),
      }),
    };

    renderPage(api);
    await user.click(await screen.findByRole('button', { name: '低风险' }));

    expect(screen.getByText('当前筛选条件下暂无异常事件')).toBeInTheDocument();
  });
});
