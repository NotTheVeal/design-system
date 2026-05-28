import React, { useState } from 'react';

interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ items, showDots = true, showArrows = true, className = '' }) => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => (i - 1 + items.length) % items.length);
  const next = () => setCurrent(i => (i + 1) % items.length);

  if (!items.length) return null;

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div className="w-full">{items[current].content}</div>
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
            aria-label="Previous"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
            aria-label="Next"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      {showDots && items.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-blue-600' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
