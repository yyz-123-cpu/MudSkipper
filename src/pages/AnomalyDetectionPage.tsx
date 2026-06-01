import { useState } from 'react';
import { AnomalyAnalysis } from '../components/dashboard/AnomalyAnalysis';
import { AnomalyEventList } from '../components/dashboard/AnomalyEventList';
import { AnnotationEditor } from '../components/dashboard/AnnotationEditor';
import { InspectionMap } from '../components/dashboard/InspectionMap';
import { InspectionStats } from '../components/dashboard/InspectionStats';
import { Panel } from '../components/dashboard/Panel';
import { ReportPreviewModal } from '../components/dashboard/ReportPreviewModal';
import { WaterQualityChart } from '../components/dashboard/WaterQualityChart';
import { useInspectionDashboard } from '../hooks/useInspectionDashboard';
import type { AnnotationStorage } from '../services/annotationStorage';
import type { InspectionApi } from '../services/inspectionApi';

interface AnomalyDetectionPageProps {
  api: InspectionApi;
  storage: AnnotationStorage;
}

export function AnomalyDetectionPage({ api, storage }: AnomalyDetectionPageProps) {
  const dashboard = useInspectionDashboard(api, storage);
  const [annotationEditorOpen, setAnnotationEditorOpen] = useState(false);
  const [reportPreviewOpen, setReportPreviewOpen] = useState(false);
  const [savedAnnotationId, setSavedAnnotationId] = useState<string | null>(null);

  if (dashboard.isLoading) {
    return <div className="dashboard-state">正在加载巡检数据...</div>;
  }

  if (dashboard.error) {
    return (
      <div className="dashboard-state dashboard-state--error">
        <p>{dashboard.error}</p>
        <button onClick={() => void dashboard.load()} type="button">
          重新加载
        </button>
      </div>
    );
  }

  if (!dashboard.data) {
    return null;
  }

  return (
    <div className="dashboard-grid">
      <div className="dashboard-left">
        <Panel className="map-panel" title="巡检地图与轨迹">
          <InspectionMap
            anomalies={dashboard.data.anomalies}
            currentPosition={dashboard.data.currentPosition}
            normalPoints={dashboard.data.normalPoints}
            onSelect={dashboard.setSelectedId}
            route={dashboard.data.route}
            selectedId={dashboard.selectedId}
          />
        </Panel>
        <Panel className="chart-panel" title="水质参数趋势图">
          <WaterQualityChart
            highlightedTime={dashboard.selectedAnomaly?.highlightedTime}
            samples={dashboard.data.waterQualitySeries}
          />
        </Panel>
      </div>

      <div className="dashboard-right">
        <Panel className="events-panel" title="异常事件列表">
          <AnomalyEventList
            annotations={dashboard.annotations}
            events={dashboard.visibleAnomalies}
            filter={dashboard.riskFilter}
            onFilterChange={dashboard.setRiskFilter}
            onSelect={dashboard.setSelectedId}
            selectedId={dashboard.selectedId}
          />
        </Panel>
        <Panel className="analysis-panel" title="异常详情与分析">
          <AnomalyAnalysis
            annotation={dashboard.selectedId ? dashboard.annotations[dashboard.selectedId] : undefined}
            annotationSaved={savedAnnotationId === dashboard.selectedId}
            event={dashboard.selectedAnomaly}
            onAnnotate={() => setAnnotationEditorOpen(true)}
          />
        </Panel>
        <InspectionStats onOpenReport={() => setReportPreviewOpen(true)} summary={dashboard.data.summary} />
      </div>

      {annotationEditorOpen && dashboard.selectedAnomaly && (
        <AnnotationEditor
          annotation={dashboard.annotations[dashboard.selectedAnomaly.id]}
          anomalyId={dashboard.selectedAnomaly.id}
          onClose={() => setAnnotationEditorOpen(false)}
          onSave={(status, notes) => {
            dashboard.saveAnnotation(dashboard.selectedAnomaly!.id, status, notes);
            setSavedAnnotationId(dashboard.selectedAnomaly!.id);
            setAnnotationEditorOpen(false);
          }}
        />
      )}

      {reportPreviewOpen && (
        <ReportPreviewModal
          event={dashboard.selectedAnomaly}
          onClose={() => setReportPreviewOpen(false)}
          summary={dashboard.data.summary}
        />
      )}
    </div>
  );
}
