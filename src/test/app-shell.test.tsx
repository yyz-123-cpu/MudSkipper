import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('application shell', () => {
  it('switches from anomaly detection to a deferred destination', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByRole('heading', { name: 'AI异常识别与分析报告' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '实时监控' }));

    expect(screen.getByRole('heading', { name: '实时监控' })).toBeInTheDocument();
    expect(screen.getByText('该模块将在后续阶段接入')).toBeInTheDocument();
  });
});
