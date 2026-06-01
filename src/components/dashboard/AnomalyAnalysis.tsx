import { PencilLine } from 'lucide-react';
import {
  annotationStatusLabels,
  riskLabels,
  type AnomalyEvent,
  type ManualAnnotation,
} from '../../domain/inspection';

interface AnomalyAnalysisProps {
  annotation?: ManualAnnotation;
  annotationSaved: boolean;
  event: AnomalyEvent | null;
  onAnnotate: () => void;
}

export function AnomalyAnalysis({ annotation, annotationSaved, event, onAnnotate }: AnomalyAnalysisProps) {
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
        <div className="site-gallery">
          <img alt={`异常点 ${event.id} 现场图像`} src={event.siteImages[0]} />
          <div>
            {event.siteImages.slice(1).map((image) => (
              <img alt="" key={image} src={image} />
            ))}
          </div>
        </div>
        <button className="secondary-button annotate-button" onClick={onAnnotate} type="button">
          <PencilLine aria-hidden="true" size={14} />
          人工标注
        </button>
        {annotation && (
          <p className="annotation-summary">
            当前状态：{annotationStatusLabels[annotation.status]}
            {annotation.notes && ` · ${annotation.notes}`}
          </p>
        )}
        {annotationSaved && <p className="annotation-success">人工标注已保存</p>}
      </div>

      <div className="analysis-copy">
        <h3>水质参数</h3>
        <dl className="water-parameters">
          <div><dt>pH</dt><dd>{event.waterQuality.ph}</dd></div>
          <div><dt>浊度</dt><dd>{event.waterQuality.turbidity} NTU</dd></div>
          <div><dt>温度</dt><dd>{event.waterQuality.temperature} °C</dd></div>
          <div><dt>溶解氧</dt><dd>{event.waterQuality.dissolvedOxygen} mg/L</dd></div>
          <div><dt>电导率</dt><dd>{event.waterQuality.conductivity} μS/cm</dd></div>
        </dl>
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
