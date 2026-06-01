import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  sortAnomaliesByRisk,
  type AnnotationStatus,
  type InspectionData,
  type ManualAnnotation,
  type RiskFilter,
} from '../domain/inspection';
import type { AnnotationStorage } from '../services/annotationStorage';
import type { InspectionApi } from '../services/inspectionApi';

export function useInspectionDashboard(api: InspectionApi, storage: AnnotationStorage) {
  const [data, setData] = useState<InspectionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<Record<string, ManualAnnotation>>(() => storage.getAll());

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const inspection = await api.getInspection();
      const anomalies = sortAnomaliesByRisk(inspection.anomalies);
      setData({ ...inspection, anomalies });
      setSelectedId((current) =>
        current && anomalies.some((event) => event.id === current) ? current : (anomalies[0]?.id ?? null),
      );
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '巡检数据加载失败，请稍后重试。');
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    void load();
  }, [load]);

  const visibleAnomalies = useMemo(() => {
    if (!data) {
      return [];
    }

    return riskFilter === 'all'
      ? data.anomalies
      : data.anomalies.filter((event) => event.risk === riskFilter);
  }, [data, riskFilter]);

  useEffect(() => {
    if (selectedId && visibleAnomalies.some((event) => event.id === selectedId)) {
      return;
    }

    setSelectedId(visibleAnomalies[0]?.id ?? null);
  }, [selectedId, visibleAnomalies]);

  const selectedAnomaly = data?.anomalies.find((event) => event.id === selectedId) ?? null;

  function saveAnnotation(anomalyId: string, status: AnnotationStatus, notes: string) {
    const annotation: ManualAnnotation = {
      anomalyId,
      status,
      notes,
      updatedAt: new Date().toISOString(),
    };

    storage.save(annotation);
    setAnnotations((current) => ({ ...current, [anomalyId]: annotation }));
  }

  return {
    annotations,
    data,
    error,
    isLoading,
    load,
    riskFilter,
    saveAnnotation,
    selectedAnomaly,
    selectedId,
    setRiskFilter,
    setSelectedId,
    visibleAnomalies,
  };
}
