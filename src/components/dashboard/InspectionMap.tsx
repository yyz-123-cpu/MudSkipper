import { CircleDot, MapPin, TriangleAlert } from 'lucide-react';
import type { AnomalyEvent, Position, RoutePoint } from '../../domain/inspection';

interface InspectionMapProps {
  anomalies: AnomalyEvent[];
  currentPosition: Position;
  normalPoints: RoutePoint[];
  onSelect: (id: string) => void;
  route: Position[];
  selectedId: string | null;
}

export function InspectionMap({
  anomalies,
  currentPosition,
  normalPoints,
  onSelect,
  route,
  selectedId,
}: InspectionMapProps) {
  const routePoints = route.map(({ x, y }) => `${x},${y}`).join(' ');

  return (
    <div className="inspection-map" data-testid="inspection-map">
      <img alt="巡检区域卫星底图" className="inspection-map__image" src="/assets/map-satellite.png" />

      <svg
        aria-hidden="true"
        className="inspection-map__route"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <polyline points={routePoints} />
      </svg>

      {normalPoints.map((point, index) => (
        <span
          className="inspection-map__normal-point"
          key={`${point.id}-${index}`}
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        >
          {point.id}
        </span>
      ))}

      {anomalies.map((event) => {
        const isSelected = event.id === selectedId;

        return (
          <button
            aria-label={`异常点 ${event.id}${isSelected ? '，已选中' : ''}`}
            className={`inspection-map__anomaly inspection-map__anomaly--${event.risk}${
              isSelected ? ' is-selected' : ''
            }`}
            key={event.id}
            onClick={() => onSelect(event.id)}
            style={{ left: `${event.mapPosition.x}%`, top: `${event.mapPosition.y}%` }}
            type="button"
          >
            <TriangleAlert aria-hidden="true" size={16} strokeWidth={2.4} />
          </button>
        );
      })}

      <span
        aria-label="当前巡检位置"
        className="inspection-map__current"
        style={{ left: `${currentPosition.x}%`, top: `${currentPosition.y}%` }}
      >
        <MapPin aria-hidden="true" size={15} strokeWidth={2.4} />
      </span>

      <div className="inspection-map__legend">
        <span>
          <i className="inspection-map__legend-line" />
          巡检轨迹
        </span>
        <span>
          <CircleDot aria-hidden="true" className="inspection-map__legend-icon is-normal" size={15} />
          正常点位
        </span>
        <span>
          <TriangleAlert
            aria-hidden="true"
            className="inspection-map__legend-icon is-anomaly"
            size={15}
          />
          异常点位
        </span>
        <span>
          <MapPin aria-hidden="true" className="inspection-map__legend-icon is-current" size={15} />
          当前点位
        </span>
      </div>

      <div className="inspection-map__scale">
        <span>200 m</span>
        <i />
      </div>
    </div>
  );
}
