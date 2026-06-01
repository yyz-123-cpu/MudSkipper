import { mockInspectionData } from '../data/mockInspectionData';
import { sortAnomaliesByRisk, type InspectionData } from '../domain/inspection';

export interface InspectionApi {
  getInspection(): Promise<InspectionData>;
}

interface MockInspectionApiOptions {
  delayMs?: number;
  shouldFail?: boolean;
}

export class MockInspectionApi implements InspectionApi {
  private readonly delayMs: number;
  private readonly shouldFail: boolean;

  constructor({ delayMs = 180, shouldFail = false }: MockInspectionApiOptions = {}) {
    this.delayMs = delayMs;
    this.shouldFail = shouldFail;
  }

  async getInspection(): Promise<InspectionData> {
    await new Promise((resolve) => window.setTimeout(resolve, this.delayMs));

    if (this.shouldFail) {
      throw new Error('巡检数据加载失败，请检查连接后重试。');
    }

    return {
      ...mockInspectionData,
      anomalies: sortAnomaliesByRisk(mockInspectionData.anomalies),
    };
  }
}

export const inspectionApi = new MockInspectionApi();
