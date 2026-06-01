import { CircleCheckBig, Clock3, FileText, Navigation, TriangleAlert } from 'lucide-react';
import type { InspectionSummary } from '../../domain/inspection';

interface InspectionStatsProps {
  onOpenReport: () => void;
  summary: InspectionSummary;
}

export function InspectionStats({ onOpenReport, summary }: InspectionStatsProps) {
  return (
    <div className="inspection-summary">
      <section className="inspection-stats">
        <h2>巡检统计</h2>
        <div className="inspection-stats__grid">
          <span>
            <Navigation aria-hidden="true" size={18} />
            <b>巡检里程</b>
            <em>{summary.routeDistance}</em>
          </span>
          <span>
            <TriangleAlert aria-hidden="true" size={18} />
            <b>异常数量</b>
            <em>{summary.anomalyCount}</em>
          </span>
          <span>
            <Clock3 aria-hidden="true" size={18} />
            <b>巡检时长</b>
            <em>{summary.duration}</em>
          </span>
          <span>
            <CircleCheckBig aria-hidden="true" size={18} />
            <b>正常点位</b>
            <em>{summary.normalPointCount}</em>
          </span>
        </div>
      </section>

      <section className="report-card">
        <h2>报告生成</h2>
        <div>
          <FileText aria-hidden="true" size={34} />
          <p>
            <strong>本次巡检报告已生成</strong>
            <small>报告编号：{summary.reportId}</small>
          </p>
          <button className="primary-button" onClick={onOpenReport} type="button">
            查看报告
          </button>
        </div>
      </section>
    </div>
  );
}
