import React from 'react';

export type ChartType = 'bar' | 'line' | 'donut' | 'pie';

export interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface DataVisualizationProps {
  type: ChartType;
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
}

// PS Design System chart color palette
const PS_CHART_COLORS = ['#005BA6', '#009CF4', '#002F48', '#0E7C55', '#E3A92D', '#B45309', '#E00000'];

const FONT = "'Source Sans 3', 'Source Sans Pro', sans-serif";

function getColor(point: DataPoint, index: number): string {
  if (point.color) return point.color;
  return PS_CHART_COLORS[index % PS_CHART_COLORS.length];
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function BarChart({ data, width, height }: { data: DataPoint[]; width: number; height: number }) {
  const paddingLeft = 48;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 40;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const barCount = data.length;
  const gap = 8;
  const barWidth = Math.max(4, (chartW - gap * (barCount - 1)) / barCount);

  const ticks = 5;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => {
    const frac = i / ticks;
    const val = maxValue * frac;
    const y = paddingTop + chartH - frac * chartH;
    return { y, val };
  });

  return (
    <g>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={paddingLeft} y1={t.y} x2={paddingLeft + chartW} y2={t.y} stroke="#DCDCDC" strokeWidth={1} />
          <text x={paddingLeft - 6} y={t.y + 4} textAnchor="end" fontSize={12} fill="#777777" fontFamily={FONT}>
            {Math.round(t.val)}
          </text>
        </g>
      ))}

      {data.map((d, i) => {
        const barH = (d.value / maxValue) * chartH;
        const x = paddingLeft + i * (barWidth + gap);
        const y = paddingTop + chartH - barH;
        const color = getColor(d, i);
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barH} fill={color} rx={2} ry={2} />
            <text x={x + barWidth / 2} y={y - 4} textAnchor="middle" fontSize={12} fill={color} fontWeight={600} fontFamily={FONT}>
              {d.value}
            </text>
            <text x={x + barWidth / 2} y={paddingTop + chartH + 16} textAnchor="middle" fontSize={12} fill="#777777" fontFamily={FONT}>
              {d.label.length > 8 ? d.label.slice(0, 7) + '\u2026' : d.label}
            </text>
          </g>
        );
      })}

      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + chartH} stroke="#DCDCDC" strokeWidth={1} />
      <line x1={paddingLeft} y1={paddingTop + chartH} x2={paddingLeft + chartW} y2={paddingTop + chartH} stroke="#DCDCDC" strokeWidth={1} />
    </g>
  );
}

// ─── Line Chart ───────────────────────────────────────────────────────────────

function LineChart({ data, width, height }: { data: DataPoint[]; width: number; height: number }) {
  const paddingLeft = 48;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 40;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const n = data.length;

  const getX = (i: number) => paddingLeft + (n === 1 ? chartW / 2 : (i / (n - 1)) * chartW);
  const getY = (v: number) => paddingTop + chartH - (v / maxValue) * chartH;

  const points = data.map((d, i) => ({ x: getX(i), y: getY(d.value), d }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath =
    `M${points[0].x},${paddingTop + chartH} ` +
    points.map((p) => `L${p.x},${p.y}`).join(' ') +
    ` L${points[points.length - 1].x},${paddingTop + chartH} Z`;

  const ticks = 5;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => {
    const frac = i / ticks;
    const val = maxValue * frac;
    const y = paddingTop + chartH - frac * chartH;
    return { y, val };
  });

  const lineColor = PS_CHART_COLORS[0];

  return (
    <g>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={paddingLeft} y1={t.y} x2={paddingLeft + chartW} y2={t.y} stroke="#DCDCDC" strokeWidth={1} />
          <text x={paddingLeft - 6} y={t.y + 4} textAnchor="end" fontSize={12} fill="#777777" fontFamily={FONT}>
            {Math.round(t.val)}
          </text>
        </g>
      ))}

      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity={0.15} />
          <stop offset="100%" stopColor={lineColor} stopOpacity={0.01} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaGrad)" />

      <polyline points={polyline} fill="none" stroke={lineColor} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill="white" stroke={lineColor} strokeWidth={2} />
          <text x={p.x} y={paddingTop + chartH + 16} textAnchor="middle" fontSize={12} fill="#777777" fontFamily={FONT}>
            {p.d.label.length > 5 ? p.d.label.slice(0, 4) + '\u2026' : p.d.label}
          </text>
        </g>
      ))}

      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + chartH} stroke="#DCDCDC" strokeWidth={1} />
      <line x1={paddingLeft} y1={paddingTop + chartH} x2={paddingLeft + chartW} y2={paddingTop + chartH} stroke="#DCDCDC" strokeWidth={1} />
    </g>
  );
}

// ─── Donut / Pie Chart ────────────────────────────────────────────────────────

function DonutPieChart({ data, width, height, isDonut }: { data: DataPoint[]; width: number; height: number; isDonut: boolean }) {
  const legendW = 140;
  const chartAreaW = width - legendW;
  const cx = chartAreaW / 2;
  const cy = height / 2;
  const outerR = Math.min(cx, cy) - 16;
  const innerR = isDonut ? outerR * 0.55 : 0;
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  let startAngle = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const fraction = d.value / total;
    const sweep = fraction * 2 * Math.PI;
    const endAngle = startAngle + sweep;
    const color = getColor(d, i);
    const x1 = cx + outerR * Math.cos(startAngle);
    const y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);
    const ix1 = cx + innerR * Math.cos(endAngle);
    const iy1 = cy + innerR * Math.sin(endAngle);
    const ix2 = cx + innerR * Math.cos(startAngle);
    const iy2 = cy + innerR * Math.sin(startAngle);
    const largeArc = sweep > Math.PI ? 1 : 0;
    let path: string;
    if (isDonut) {
      path = [`M ${x1} ${y1}`, `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}`, `L ${ix1} ${iy1}`, `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2}`, 'Z'].join(' ');
    } else {
      path = [`M ${cx} ${cy}`, `L ${x1} ${y1}`, `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}`, 'Z'].join(' ');
    }
    startAngle = endAngle;
    return { path, color, fraction, d };
  });

  const pct = (f: number) => (f * 100).toFixed(1) + '%';

  return (
    <g>
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth={2} />
      ))}
      {isDonut && (
        <>
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize={20} fontWeight={700} fill="#002F48" fontFamily={FONT}>{total}</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontSize={12} fill="#777777" fontFamily={FONT}>Total</text>
        </>
      )}
      {data.map((d, i) => {
        const color = getColor(d, i);
        const ly = 20 + i * 22;
        return (
          <g key={i} transform={`translate(${chartAreaW + 8}, ${ly})`}>
            <rect x={0} y={0} width={12} height={12} rx={2} fill={color} />
            <text x={16} y={10} fontSize={12} fill="#777777" fontFamily={FONT}>{d.label} ({pct(d.value / total)})</text>
          </g>
        );
      })}
    </g>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  type,
  data,
  title,
  subtitle,
  width = 480,
  height = 300,
}) => {
  const titleH = title ? (subtitle ? 52 : 32) : 0;
  const svgH = height + titleH;

  return (
    <div style={{ minHeight: 300 }}>
      <svg
        width={width}
        height={svgH}
        viewBox={`0 0 ${width} ${svgH}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: FONT }}
      >
        {title && (
          <text x={8} y={20} fontSize={14} fontWeight={700} fill="#002F48" fontFamily={FONT}>{title}</text>
        )}
        {subtitle && (
          <text x={8} y={38} fontSize={12} fill="#777777" fontFamily={FONT}>{subtitle}</text>
        )}

        <g transform={`translate(0, ${titleH})`}>
          {type === 'bar' && <BarChart data={data} width={width} height={height} />}
          {type === 'line' && <LineChart data={data} width={width} height={height} />}
          {type === 'donut' && <DonutPieChart data={data} width={width} height={height} isDonut={true} />}
          {type === 'pie' && <DonutPieChart data={data} width={width} height={height} isDonut={false} />}
        </g>
      </svg>
    </div>
  );
};

export default DataVisualization;
