import { Printer, X } from 'lucide-react';
import type { AnomalyEvent, InspectionSummary } from '../../domain/inspection';

interface ReportPreviewModalProps {
  event: AnomalyEvent | null;
  onClose: () => void;
  summary: InspectionSummary;
}

export function ReportPreviewModal({ event, onClose, summary }: ReportPreviewModalProps) {
  return (
    <div className="modal-backdrop">
      <section
        aria-label="巡检报告预览"
        aria-modal="true"
        className="operator-modal report-preview"
        role="dialog"
      >
        <header>
          <div>
            <span>MudSkipper-X 智能巡检系统</span>
            <h2>巡检报告预览</h2>
          </div>
          <button aria-label="关闭报告预览" className="icon-button" onClick={onClose} type="button">
            <X aria-hidden="true" size={18} />
          </button>
        </header>

        <div className="report-preview__body">
          <div className="report-preview__heading">
            <div>
              <span>报告编号</span>
              <strong>{summary.reportId}</strong>
            </div>
            <time>巡检日期：2025-05-20</time>
          </div>

          <div className="report-preview__metrics">
            <span>巡检里程 <b>{summary.routeDistance}</b></span>
            <span>巡检时长 <b>{summary.duration}</b></span>
            <span>异常事件 <b>{summary.anomalyCount}</b></span>
            <span>正常点位 <b>{summary.normalPointCount}</b></span>
          </div>

          {event && (
            <section className="report-preview__focus">
              <h3>重点异常：异常点 {event.id}</h3>
              <p>{event.analysis}</p>
              <small>{event.coordinates} · {event.timestamp}</small>
            </section>
          )}
        </div>

        <footer>
          <button className="secondary-button" onClick={onClose} type="button">
            关闭
          </button>
          <button className="primary-button" onClick={() => window.print()} type="button">
            <Printer aria-hidden="true" size={15} />
            打印报告
          </button>
        </footer>
      </section>
    </div>
  );
}
