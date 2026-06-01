import ReactECharts from 'echarts-for-react';
import type { WaterQualitySample } from '../../domain/inspection';

interface WaterQualityChartProps {
  highlightedTime?: string;
  samples: WaterQualitySample[];
}

export function WaterQualityChart({ highlightedTime, samples }: WaterQualityChartProps) {
  const labels = samples.map((sample) => sample.time);
  const highlightedIndex = Math.max(
    0,
    samples.findIndex((sample) => sample.time === highlightedTime),
  );

  const option = {
    animation: false,
    backgroundColor: 'transparent',
    color: ['#58b5ff', '#ff8b22', '#32d5d7', '#76c86e'],
    grid: { bottom: 30, left: 34, right: 35, top: 48 },
    legend: {
      data: ['pH', '浊度 (NTU)', '温度 (°C)', '溶解氧 (mg/L)'],
      itemHeight: 7,
      itemWidth: 22,
      textStyle: { color: '#c7d9ea', fontSize: 12 },
      top: 8,
    },
    series: [
      {
        data: samples.map((sample) => sample.ph),
        name: 'pH',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        type: 'line',
        yAxisIndex: 1,
      },
      {
        data: samples.map((sample) => sample.turbidity),
        markLine: {
          data: [{ xAxis: highlightedIndex }],
          label: {
            color: '#ff725d',
            formatter: highlightedTime ?? '',
            position: 'insideEndTop',
          },
          lineStyle: { color: '#ff725d', type: 'dashed', width: 1 },
          symbol: 'none',
        },
        name: '浊度 (NTU)',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        type: 'line',
      },
      {
        data: samples.map((sample) => sample.temperature),
        name: '温度 (°C)',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        type: 'line',
        yAxisIndex: 1,
      },
      {
        data: samples.map((sample) => sample.dissolvedOxygen),
        name: '溶解氧 (mg/L)',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        type: 'line',
        yAxisIndex: 1,
      },
    ],
    tooltip: {
      axisPointer: { type: 'cross' },
      backgroundColor: 'rgba(3, 27, 48, 0.94)',
      borderColor: '#167caa',
      textStyle: { color: '#e8f5ff' },
      trigger: 'axis',
    },
    xAxis: {
      axisLabel: { color: '#a9bed2', fontSize: 11 },
      axisLine: { lineStyle: { color: '#3c6079' } },
      axisTick: { show: false },
      data: labels,
      type: 'category',
    },
    yAxis: [
      {
        axisLabel: { color: '#a9bed2', fontSize: 11 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: 'rgba(92, 143, 178, 0.18)' } },
        type: 'value',
      },
      {
        axisLabel: { color: '#a9bed2', fontSize: 11 },
        axisLine: { show: false },
        max: 30,
        min: 0,
        splitLine: { show: false },
        type: 'value',
      },
    ],
  };

  return (
    <div className="water-quality-chart" data-testid="water-quality-chart">
      <ReactECharts lazyUpdate notMerge option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
