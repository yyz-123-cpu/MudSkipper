import { annotationStatusLabels, riskLabels, type AnomalyEvent, type ManualAnnotation, type RiskFilter } from '../../domain/inspection';

const filters: RiskFilter[] = ['all', 'high', 'medium', 'low'];

interface AnomalyEventListProps {
  annotations: Record<string, ManualAnnotation>;
  events: AnomalyEvent[];
  filter: RiskFilter;
  onFilterChange: (filter: RiskFilter) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export function AnomalyEventList({
  annotations,
  events,
  filter,
  onFilterChange,
  onSelect,
  selectedId,
}: AnomalyEventListProps) {
  return (
    <>
      <div aria-label="风险等级筛选" className="risk-filters">
        {filters.map((value) => (
          <button
            aria-pressed={filter === value}
            className={`risk-filter${filter === value ? ' risk-filter--active' : ''}`}
            key={value}
            onClick={() => onFilterChange(value)}
            type="button"
          >
            {value === 'all' ? '全部' : riskLabels[value]}
          </button>
        ))}
      </div>

      {events.length === 0 ? (
        <div className="empty-events">当前筛选条件下暂无异常事件</div>
      ) : (
        <div className="event-list">
          {events.map((event) => {
            const annotation = annotations[event.id];

            return (
              <button
                aria-label={`查看异常点 ${event.id}`}
                aria-pressed={event.id === selectedId}
                className={`event-card event-card--${event.risk}${event.id === selectedId ? ' event-card--selected' : ''}`}
                key={event.id}
                onClick={() => onSelect(event.id)}
                type="button"
              >
                <img alt="" src={event.thumbnail} />
                <span className="event-card__content">
                  <span className="event-card__title">
                    <i />
                    <b>异常点 {event.id}</b>
                    <em>{event.severityLabel}</em>
                  </span>
                  <span className="event-card__description">{event.description}</span>
                </span>
                <span className="event-card__meta">
                  <time>{event.timestamp}</time>
                  {annotation && <small>{annotationStatusLabels[annotation.status]}</small>}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
