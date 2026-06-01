import { riskLabels, type AnomalyEvent, type ManualAnnotation } from '../../domain/inspection';

interface AnomalyAnalysisProps {
  annotation?: ManualAnnotation;
  event: AnomalyEvent | null;
}

export function AnomalyAnalysis({ annotation, event }: AnomalyAnalysisProps) {
  if (!event) {
    return <div className="empty-analysis">请选择异常事件查看分析详情</div>;
  }

  return (
    <div className="analysis-grid">
      <div className="analysis-overview">
        <div className="analysis-title">
          <strong>异常点 {event.id}</strong>
          <span className={`severity severity--${event.risk}`}>{event.severityLabel}</span>
        </div>
        <dl>
          <div>
            <dt>位置坐标</dt>
            <dd>{event.coordinates}</dd>
          </div>
          <div>
            <dt>发现时间</dt>
            <dd>2025-05-20 {event.timestamp}</dd>
          </div>
          <div>
            <dt>异常类型</dt>
            <dd>{event.anomalyType}</dd>
          </div>
          <div>
            <dt>风险等级</dt>
            <dd className={`risk-text risk-text--${event.risk}`}>{riskLabels[event.risk]}</dd>
          </div>
        </dl>
        {annotation && <p className="annotation-summary">人工标注：{annotation.notes || '已更新处理状态'}</p>}
      </div>

      <div className="analysis-copy">
        <h3>AI分析结论</h3>
        <p>{event.analysis}</p>
        <h3>处理建议</h3>
        <ul>
          {event.recommendations.map((recommendation) => (
            <li key={recommendation}>{recommendation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
