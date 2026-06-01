export type RiskLevel = 'high' | 'medium' | 'low';
export type RiskFilter = 'all' | RiskLevel;
export type AnnotationStatus = 'pending' | 'in_progress' | 'reviewed' | 'closed';

export interface Position {
  x: number;
  y: number;
}

export interface RoutePoint extends Position {
  id: string;
  kind: 'normal' | 'anomaly' | 'current';
}

export interface WaterQualityValues {
  ph: number;
  turbidity: number;
  temperature: number;
  dissolvedOxygen: number;
  conductivity: number;
}

export interface WaterQualitySample extends WaterQualityValues {
  time: string;
}

export interface AnomalyEvent {
  id: string;
  risk: RiskLevel;
  severityLabel: string;
  timestamp: string;
  description: string;
  coordinates: string;
  anomalyType: string;
  thumbnail: string;
  siteImages: string[];
  mapPosition: Position;
  waterQuality: WaterQualityValues;
  analysis: string;
  recommendations: string[];
  highlightedTime: string;
}

export interface InspectionSummary {
  routeDistance: string;
  duration: string;
  anomalyCount: number;
  normalPointCount: number;
  reportId: string;
}

export interface InspectionData {
  summary: InspectionSummary;
  route: Position[];
  normalPoints: RoutePoint[];
  currentPosition: Position;
  waterQualitySeries: WaterQualitySample[];
  anomalies: AnomalyEvent[];
}

export interface ManualAnnotation {
  anomalyId: string;
  status: AnnotationStatus;
  notes: string;
  updatedAt: string;
}

export const riskOrder: Record<RiskLevel, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const riskLabels: Record<RiskLevel, string> = {
  high: '高风险',
  medium: '中风险',
  low: '低风险',
};

export const annotationStatusLabels: Record<AnnotationStatus, string> = {
  pending: '待处理',
  in_progress: '处理中',
  reviewed: '已复核',
  closed: '已关闭',
};

export function sortAnomaliesByRisk(anomalies: AnomalyEvent[]): AnomalyEvent[] {
  return [...anomalies].sort((left, right) => riskOrder[right.risk] - riskOrder[left.risk]);
}
