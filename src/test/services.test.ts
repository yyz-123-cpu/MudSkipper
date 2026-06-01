import { describe, expect, it } from 'vitest';
import { LocalAnnotationStorage } from '../services/annotationStorage';
import { MockInspectionApi } from '../services/inspectionApi';

describe('inspection adapters', () => {
  it('returns four anomalies ordered from highest to lowest risk', async () => {
    const api = new MockInspectionApi({ delayMs: 0 });

    const inspection = await api.getInspection();

    expect(inspection.anomalies).toHaveLength(4);
    expect(inspection.anomalies.map((event) => event.id)).toEqual([
      '05',
      '03',
      '07',
      '06',
    ]);
  });

  it('persists annotations by anomaly identifier', () => {
    const storage = new LocalAnnotationStorage(window.localStorage);

    storage.save({
      anomalyId: '05',
      status: 'in_progress',
      notes: '已安排人工复核。',
      updatedAt: '2026-06-01T08:00:00.000Z',
    });

    expect(storage.get('05')).toEqual({
      anomalyId: '05',
      status: 'in_progress',
      notes: '已安排人工复核。',
      updatedAt: '2026-06-01T08:00:00.000Z',
    });
  });
});
