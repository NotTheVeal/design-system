import React, { useMemo } from 'react';

// PS Design System 2.0 chart colors
const PS_COLORS = ['#005BA6', '#009CF4', '#17AB78', '#E3A92D', '#D32F2F', '#002F48', '#0E7C55', '#B45309'];
const PS_GRID = '#DCDCDC';
const PS_TEXT = '#777777';
const PS_FONT = "'Source Sans Pro', -apple-system, sans-serif";

export interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartSeries {
  name: string;
  data: number[];
  color?: string;
}

export interface DataVisualizationProps {
  type: 'bar' | 'line' | 'pie' | 'donut' | 'area';
  title?: string;
  labels?: string[];
  series?: ChartSeries[];
  data?: DataPoint[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  showValues?: boolean;
  className?: string;
}

// ---- BAR CHART ----
function BarChart({ labels = [], series = [], height = 240, showGrid = true, showValues = false }: {
  labels: string[]; series: ChartSeries[]; height: number; showGrid: boolean; showValues: boolean;
}) {
  const pad = { top: 16, right: 16, bottom: 40, left: 40 };
  const W = 480, H = height;
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;
  const allVals = series.flatMap(s => s.data);
  const maxVal = Math.max(...allVals, 1);
  const barGroups = labels.length;
  const groupW = cW / barGroups;
  const barW = Math.min(groupW / series.length - 4, 32);
  const gridLines = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, fontFamily: PS_FONT }}>
      {/* Grid */}
      {showGrid && Array.from({ length: gridLines + 1 }, (_, i) => {
        const y = pad.top + (cH * i) / gridLines;
        const val = Math.round(maxVal * (1 - i / gridLines));
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={pad.left + cW} y2={y} stroke={PS_GRID} strokeWidth="1" />
            <text x={pad.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill={PS_TEXT}>{val.toLocaleString()}</text>
          </g>
        );
      })}
      {/* Bars */}
      {labels.map((lbl, gi) => {
        const gX = pad.left + gi * groupW;
        return (
          <g key={gi}>
            {series.map((s, si) => {
              const x = gX + (groupW - series.length * (barW + 4)) / 2 + si * (barW + 4);
              const barH = (s.data[gi] / maxVal) * cH;
              const y = pad.top + cH - barH;
              const color = s.color || PS_COLORS[si % PS_COLORS.length];
              return (
                <g key={si}>
                  <rect x={x} y={y} width={barW} height={barH} fill={color} rx="2" opacity="0.9" />
                  {showValues && <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="10" fill={PS_TEXT}>{s.data[gi]}</text>}
                </g>
              );
            })}
            <text x={gX + groupW / 2} y={pad.top + cH + 16} textAnchor="middle" fontSize="11" fill={PS_TEXT}>{lbl}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---- LINE / AREA CHART ----
function LineChart({ labels = [], series = [], height = 240, type = 'line', showGrid = true }: {
  labels: string[]; series: ChartSeries[]; height: number; type: 'line' | 'area'; showGrid: boolean;
}) {
  const pad = { top: 16, right: 16, bottom: 40, left: 48 };
  const W = 480, H = height;
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;
  const allVals = series.flatMap(s => s.data);
  const maxVal = Math.max(...allVals, 1);
  const step = labels.length > 1 ? cW / (labels.length - 1) : cW;
  const gridLines = 4;

  const getPoint = (val: number, i: number) => ({
    x: pad.left + i * step,
    y: pad.top + cH - (val / maxVal) * cH
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, fontFamily: PS_FONT }}>
      <defs>
        {series.map((s, si) => {
          const color = s.color || PS_COLORS[si % PS_COLORS.length];
          return (
            <linearGradient key={si} id={`area-${si}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
          );
        })}
      </defs>
      {/* Grid */}
      {showGrid && Array.from({ length: gridLines + 1 }, (_, i) => {
        const y = pad.top + (cH * i) / gridLines;
        return <line key={i} x1={pad.left} y1={y} x2={pad.left + cW} y2={y} stroke={PS_GRID} strokeWidth="1" />;
      })}
      {/* Series */}
      {series.map((s, si) => {
        const color = s.color || PS_COLORS[si % PS_COLORS.length];
        const points = s.data.map((v, i) => getPoint(v, i));
        const pathD = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
        const areaD = [`M${points[0].x},${pad.top + cH}`, pathD.replace(/^M/, 'L'), `L${points[points.length - 1].x},${pad.top + cH}Z`].join(' ');
        return (
          <g key={si}>
            {type === 'area' && <path d={areaD} fill={`url(#area-${si})`} />}
            <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} stroke="#fff" strokeWidth="2" />)}
          </g>
        );
      })}
      {/* X labels */}
      {labels.map((lbl, i) => <text key={i} x={pad.left + i * step} y={pad.top + cH + 16} textAnchor="middle" fontSize="11" fill={PS_TEXT}>{lbl}</text>)}
    </svg>
  );
}

// ---- PIE / DONUT ----
function PieChart({ data = [], type = 'pie', height = 240 }: { data: DataPoint[]; type: 'pie' | 'donut'; height: number }) {
  const R = 80, cx = 140, cy = height / 2;
  const innerR = type === 'donut' ? R * 0.55 : 0;
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;

  const slices = data.map((d, i) => {
    const start = angle;
    const sweep = (d.value / total) * 2 * Math.PI;
    angle += sweep;
    const x1 = cx + R * Math.cos(start), y1 = cy + R * Math.sin(start);
    const x2 = cx + R * Math.cos(angle), y2 = cy + R * Math.sin(angle);
    const xi1 = cx + innerR * Math.cos(start), yi1 = cy + innerR * Math.sin(start);
    const xi2 = cx + innerR * Math.cos(angle), yi2 = cy + innerR * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    const path = innerR > 0
      ? `M${xi1},${yi1} L${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} L${xi2},${yi2} A${innerR},${innerR} 0 ${large},0 ${xi1},${yi1}`
      : `M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2}Z`;
    return { path, color: d.color || PS_COLORS[i % PS_COLORS.length], label: d.label, value: d.value, pct: Math.round(d.value / total * 100) };
  });

  const W = 360;
  return (
    <svg viewBox={`0 0 ${W} ${height}`} style={{ width: '100%', maxWidth: W, fontFamily: PS_FONT }}>
      {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} opacity="0.9" stroke="#fff" strokeWidth="2" />)}
      {/* Legend */}
      {slices.map((s, i) => (
        <g key={i} transform={`translate(290, ${16 + i * 22})`}>
          <rect width="12" height="12" fill={s.color} rx="2" />
          <text x="18" y="10" fontSize="11" fill="#4A4A4A">{s.label} ({s.pct}%)</text>
        </g>
      ))}
    </svg>
  );
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  type = 'bar',
  title,
  labels = [],
  series = [],
  data = [],
  height = 240,
  showLegend = true,
  showGrid = true,
  showValues = false,
  className = '',
}) => {
  const chartId = useMemo(() => Math.random().toString(36).slice(2), []);

  return (
    <div className={className} style={{ fontFamily: PS_FONT, width: '100%' }}>
      {title && (
        <h4 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#002F48' }}>{title}</h4>
      )}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        {(type === 'bar') && <BarChart labels={labels} series={series} height={height} showGrid={showGrid} showValues={showValues} />}
        {(type === 'line' || type === 'area') && <LineChart labels={labels} series={series} height={height} type={type} showGrid={showGrid} />}
        {(type === 'pie' || type === 'donut') && <PieChart data={data} type={type} height={height} />}
      </div>
      {showLegend && series.length > 0 && (type === 'bar' || type === 'line' || type === 'area') && (
        <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
          {series.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: s.color || PS_COLORS[i % PS_COLORS.length], flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#4A4A4A' }}>{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataVisualization;
