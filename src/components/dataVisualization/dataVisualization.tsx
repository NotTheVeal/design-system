import React from 'react';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface DataVisualizationProps {
  type?: 'bar' | 'donut' | 'line';
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  showLegend?: boolean;
  className?: string;
}

const DEFAULT_COLORS = ['#005BA6','#009CF4','#17AB78','#E3A92D','#E00000','#777777','#002F48','#DCEAED'];

const DataVisualization: React.FC<DataVisualizationProps> = ({
  type = 'bar', data, title, subtitle, height = 300, showLegend = true, className = '',
}) => {
  const max = Math.max(...data.map(d => d.value), 1);

  const renderBar = () => (
    <div className="flex items-end gap-2 w-full" style={{ height }}>
      {data.map((d, i) => {
        const pct = (d.value / max) * 100;
        const color = d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
        return (
          <div key={i} className="flex flex-col items-center flex-1 gap-1">
            <span className="text-xs text-gray-600">{d.value}</span>
            <div className="w-full rounded-t-sm" style={{ height: `${pct}%`, background: color, minHeight: 4 }} />
            <span className="text-xs text-gray-500 truncate w-full text-center">{d.label}</span>
          </div>
        );
      })}
    </div>
  );

  const renderDonut = () => {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const r = 80; const cx = 100; const cy = 100;
    let offset = -Math.PI / 2;
    const slices = data.map((d, i) => {
      const angle = (d.value / total) * 2 * Math.PI;
      const x1 = cx + r * Math.cos(offset); const y1 = cy + r * Math.sin(offset);
      offset += angle;
      const x2 = cx + r * Math.cos(offset); const y2 = cy + r * Math.sin(offset);
      const large = angle > Math.PI ? 1 : 0;
      return { d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`, color: d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length] };
    });
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <svg viewBox="0 0 200 200" width={height} height={height}>
          {slices.map((s, i) => <path key={i} d={s.d} fill={s.color} stroke="white" strokeWidth="2" />)}
          <circle cx={cx} cy={cy} r={50} fill="white" />
        </svg>
      </div>
    );
  };

  const renderLine = () => {
    const w = 400; const h = height;
    const pad = 32;
    const pts = data.map((d, i) => ({ x: pad + (i / Math.max(data.length - 1, 1)) * (w - pad * 2), y: h - pad - ((d.value / max) * (h - pad * 2)) }));
    const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
        <path d={pathD} fill="none" stroke="#005BA6" strokeWidth="2" strokeLinejoin="round" />
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill="#005BA6" />)}
      </svg>
    );
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-base font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      {type === 'bar' && renderBar()}
      {type === 'donut' && renderDonut()}
      {type === 'line' && renderLine()}
      {showLegend && (
        <div className="flex flex-wrap gap-3 mt-4">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length] }} />
              <span className="text-xs text-gray-600">{d.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataVisualization;
