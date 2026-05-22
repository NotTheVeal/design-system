import React from 'react';

interface CarouselProps {
  items: React.ReactNode[];
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ items, className }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') nextSlide();
      if (event.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`carousel ${className}`}>
      <style>{`
        :root {
          --ps-carousel-background: #fff;
          --ps-carousel-border: #DCDCDC;
          --ps-carousel-border-width: 1px;
          --ps-carousel-radius: 8px;
          --ps-carousel-slide-padding-v: 24px;
          --ps-carousel-slide-padding-h: 24px;
          --ps-carousel-slide-gap: 16px;
          --ps-carousel-navigation-arrow-background: #fff;
          --ps-carousel-navigation-arrow-background-hover: #f4f4f4;
          --ps-carousel-navigation-arrow-border: #DCDCDC;
          --ps-carousel-navigation-arrow-border-width: 1px;
          --ps-carousel-navigation-arrow-radius: 50%;
          --ps-carousel-navigation-arrow-size: 32px;
          --ps-carousel-navigation-arrow-icon: #999;
          --ps-carousel-navigation-arrow-icon-hover: #005BA6;
          --ps-carousel-navigation-dot-size: 8px;
          --ps-carousel-navigation-dot-size-active: 24px;
          --ps-carousel-navigation-dot-radius: 100px;
          --ps-carousel-navigation-dot-color: #ccc;
          --ps-carousel-navigation-dot-color-active: #005BA6;
          --ps-carousel-navigation-dot-gap: 6px;
          --ps-carousel-animation-duration: 300ms;
          --ps-carousel-animation-easing: ease-in-out;
        }
        .carousel {
          background: var(--ps-carousel-background);
          border: var(--ps-carousel-border) solid var(--ps-carousel-border-width);
          border-radius: var(--ps-carousel-radius);
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .carousel-slide {
          display: flex;
          padding: var(--ps-carousel-slide-padding-v) var(--ps-carousel-slide-padding-h);
          transition: transform var(--ps-carousel-animation-duration) var(--ps-carousel-animation-easing);
          transform: translateX(-${currentIndex * 100}%);
        }
        .carousel-navigation {
          position: absolute;
          top: 50%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
        }
        .arrow {
          background: var(--ps-carousel-navigation-arrow-background);
          border: var(--ps-carousel-navigation-arrow-border) solid var(--ps-carousel-navigation-arrow-border-width);
          border-radius: var(--ps-carousel-navigation-arrow-radius);
          width: var(--ps-carousel-navigation-arrow-size);
          height: var(--ps-carousel-navigation-arrow-size);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s;
        }
        .arrow:hover {
          background: var(--ps-carousel-navigation-arrow-background-hover);
        }
        .dot-container {
          text-align: center;
          margin-top: 16px;
        }
        .dot {
          display: inline-block;
          width: var(--ps-carousel-navigation-dot-size);
          height: var(--ps-carousel-navigation-dot-size);
          border-radius: var(--ps-carousel-navigation-dot-radius);
          background: var(--ps-carousel-navigation-dot-color);
          margin: var(--ps-carousel-navigation-dot-gap);
          cursor: pointer;
          transition: width .3s, height .3s, background .3s;
        }
        .dot-active {
          width: var(--ps-carousel-navigation-dot-size-active);
          height: var(--ps-carousel-navigation-dot-size-active);
          background: var(--ps-carousel-navigation-dot-color-active);
        }
      `}</style>
      <div className="carousel-slide" role="region" aria-label="Image carousel" tabIndex={0}>
        {items.map((item, index) => (
          <div key={index} className="carousel-item" style={{ minWidth: '100%' }}>
            {item}
          </div>
        ))}
      </div>
      <div className="carousel-navigation" aria-label="Carousel navigation">
        <div className="arrow" onClick={prevSlide} aria-label="Previous slide" role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && prevSlide()}>
          &#9664;
        </div>
        <div className="arrow" onClick={nextSlide} aria-label="Next slide" role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && nextSlide()}>
          &#9654;
        </div>
      </div>
      <div className="dot-container">
        {items.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? 'dot-active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
