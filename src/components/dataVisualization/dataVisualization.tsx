import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const DEFAULT_COLORS = [
  '#005BA6',
  '#009CF4',
  '#17AB78',
  '#E3A92D',
  '#E00000',
  '#777777',
  '#002F48',
  '#DCEAED',
];

interface DataPoint {
  value: number;
  label: string;
  color?: string;
}

interface DataVisualizationProps {
  type: 'bar' | 'donut' | 'line';
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  type,
  data,
  title,
  subtitle,
  height = 300,
}) => {
  const renderBar = () => {
    const max = Math.max(...data.map(d => d.value));
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, width: '100%', height }}>
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          const color = d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
          return (
            <div
              key={i}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 4 }}
            >
              <span style={{ fontSize: 12, color: '#777777', fontFamily }}>{d.value}</span>
              <div
                style={{
                  width: '100%',
                  borderRadius: '2px 2px 0 0',
                  height: `${pct}%`,
                  background: color,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: '#949494',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  textAlign: 'center',
                  fontFamily,
                }}
              >
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDonut = () => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const cx = 100;
    const cy = 100;
    const r = 80;
    let angle = -Math.PI / 2;
    const slices = data.map((d, i) => {
      const sweep = (d.value / total) * 2 * Math.PI;
      const x1 = cx + r * Math.cos(angle);
      const y1 = cy + r * Math.sin(angle);
      const x2 = cx + r * Math.cos(angle + sweep);
      const y2 = cy + r * Math.sin(angle + sweep);
      const large = sweep > Math.PI ? 1 : 0;
      const pathD = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
      const color = d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
      angle += sweep;
      return { d: pathD, color };
    });

    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 200 200" width={height} height={height}>
            {slices.map((s, i) => (
              <path key={i} d={s.d} fill={s.color} />
            ))}
            <circle cx={cx} cy={cy} r={50} fill="white" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
          {data.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
                }}
              />
              <span style={{ fontSize: 12, color: '#777777', fontFamily }}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLine = () => {
    const w = 400;
    const h = height;
    const pad = 32;
    const maxVal = Math.max(...data.map(d => d.value));
    const pts = data.map((d, i) => ({
      x: pad + (i / (data.length - 1)) * (w - 2 * pad),
      y: h - pad - (d.value / maxVal) * (h - 2 * pad),
    }));
    const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

    return (
      <div style={{ width: '100%' }}>
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={height} style={{ display: 'block' }}>
          <path d={pathD} stroke="#005BA6" fill="none" strokeWidth={2} />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={4} fill="#005BA6" stroke="white" strokeWidth={2} />
          ))}
        </svg>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
          {data.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: '#005BA6',
                }}
              />
              <span style={{ fontSize: 12, color: '#777777', fontFamily }}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: 16 }}>
          {title && (
            <div style={{ fontSize: 16, fontWeight: 600, color: '#4A4A4A', fontFamily }}>
              {title}
            </div>
          )}
          {subtitle && (
            <div style={{ fontSize: 14, color: '#949494', fontFamily }}>
              {subtitle}
            </div>
          )}
        </div>
      )}
      {type === 'bar' && renderBar()}
      {type === 'donut' && renderDonut()}
      {type === 'line' && renderLine()}
    </div>
  );
};

export default DataVisualization;
