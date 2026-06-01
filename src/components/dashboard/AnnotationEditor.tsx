import { useState } from 'react';
import {
  annotationStatusLabels,
  type AnnotationStatus,
  type ManualAnnotation,
} from '../../domain/inspection';

interface AnnotationEditorProps {
  annotation?: ManualAnnotation;
  anomalyId: string;
  onClose: () => void;
  onSave: (status: AnnotationStatus, notes: string) => void;
}

const statuses = Object.entries(annotationStatusLabels) as [AnnotationStatus, string][];

export function AnnotationEditor({
  annotation,
  anomalyId,
  onClose,
  onSave,
}: AnnotationEditorProps) {
  const [notes, setNotes] = useState(annotation?.notes ?? '');
  const [status, setStatus] = useState<AnnotationStatus>(annotation?.status ?? 'pending');

  return (
    <div className="modal-backdrop">
      <section aria-label="人工标注" aria-modal="true" className="operator-modal" role="dialog">
        <header>
          <div>
            <span>人工复核工作流</span>
            <h2>异常点 {anomalyId} 人工标注</h2>
          </div>
          <button aria-label="关闭人工标注" className="icon-button" onClick={onClose} type="button">
            ×
          </button>
        </header>

        <div className="annotation-form">
          <label>
            <span>处理状态</span>
            <select onChange={(event) => setStatus(event.target.value as AnnotationStatus)} value={status}>
              {statuses.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>标注备注</span>
            <textarea
              onChange={(event) => setNotes(event.target.value)}
              placeholder="补充人工复核结果、采样安排或处置记录"
              rows={5}
              value={notes}
            />
          </label>
        </div>

        <footer>
          <button className="secondary-button" onClick={onClose} type="button">
            取消
          </button>
          <button className="primary-button" onClick={() => onSave(status, notes.trim())} type="button">
            保存标注
          </button>
        </footer>
      </section>
    </div>
  );
}
