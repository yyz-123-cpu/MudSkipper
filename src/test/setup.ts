import '@testing-library/jest-dom/vitest';
import { createElement } from 'react';
import { afterEach, vi } from 'vitest';

vi.mock('echarts-for-react', () => ({
  default: () => createElement('div', { 'data-testid': 'echarts-instance' }),
}));

afterEach(() => {
  window.localStorage.clear();
});
