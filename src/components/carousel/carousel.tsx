import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface CarouselItem {
  content: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="10 12 6 8 10 4" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 4 10 8 6 12" />
  </svg>
);

const Carousel: React.FC<CarouselProps> = ({
  items,
  showDots = true,
  showArrows = true,
  className = '',
}) => {
  const [current, setCurrent] = useState(0);
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  const prev = () => setCurrent(c => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === items.length - 1 ? 0 : c + 1));

  if (!items.length) return null;

  const arrowStyle = (hovered: boolean, side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute',
    top: '50%',
    [side]: 8,
    transform: 'translateY(-50%)',
    background: hovered ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
    border: 'none',
    borderRadius: '50%',
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#4A4A4A',
    boxShadow: '0 2px 6px rgba(0,47,72,0.14)',
    transition: 'background 150ms ease',
    padding: 0,
    zIndex: 1,
  });

  return (
    <div
      className={className}
      style={{
        fontFamily,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Slide container */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 8 }}>
        <div
          style={{
            display: 'flex',
            transition: 'transform 300ms ease',
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {items.map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: '100%' }}>
              {item.content}
            </div>
          ))}
        </div>

        {showArrows && items.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              onMouseEnter={() => setLeftHovered(true)}
              onMouseLeave={() => setLeftHovered(false)}
              style={arrowStyle(leftHovered, 'left')}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={next}
              onMouseEnter={() => setRightHovered(true)}
              onMouseLeave={() => setRightHovered(false)}
              style={arrowStyle(rightHovered, 'right')}
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {showDots && items.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === current ? '#005BA6' : '#DCDCDC',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'background 150ms ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
