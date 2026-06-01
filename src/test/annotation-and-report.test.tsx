import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnomalyDetectionPage } from '../pages/AnomalyDetectionPage';
import { LocalAnnotationStorage } from '../services/annotationStorage';
import { MockInspectionApi } from '../services/inspectionApi';

function renderPage(storage: LocalAnnotationStorage) {
  return render(<AnomalyDetectionPage api={new MockInspectionApi({ delayMs: 0 })} storage={storage} />);
}

describe('operator annotation and report workflow', () => {
  it('persists a reviewed manual annotation after the dashboard is mounted again', async () => {
    const user = userEvent.setup();
    const storage = new LocalAnnotationStorage(window.localStorage);
    const view = renderPage(storage);

    await user.click(await screen.findByRole('button', { name: '人工标注' }));
    const dialog = screen.getByRole('dialog', { name: '人工标注' });
    await user.selectOptions(within(dialog).getByLabelText('处理状态'), 'reviewed');
    await user.type(within(dialog).getByLabelText('标注备注'), '已安排复核采样。');
    await user.click(within(dialog).getByRole('button', { name: '保存标注' }));

    expect(screen.getByText('人工标注已保存')).toBeInTheDocument();
    expect(storage.get('05')).toMatchObject({
      anomalyId: '05',
      notes: '已安排复核采样。',
      status: 'reviewed',
    });

    view.unmount();
    renderPage(storage);

    expect(await screen.findByText('已复核')).toBeInTheDocument();
  });

  it('opens and closes the report preview', async () => {
    const user = userEvent.setup();
    renderPage(new LocalAnnotationStorage(window.localStorage));

    await user.click(await screen.findByRole('button', { name: '查看报告' }));

    const dialog = screen.getByRole('dialog', { name: '巡检报告预览' });
    expect(within(dialog).getByText('MSX-20250520-003')).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: '打印报告' })).toBeInTheDocument();

    await user.click(within(dialog).getByRole('button', { name: '关闭' }));

    expect(screen.queryByRole('dialog', { name: '巡检报告预览' })).not.toBeInTheDocument();
  });
});
