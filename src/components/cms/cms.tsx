import React from 'react';

interface CmsBlockProps {
  type: 'hero' | 'text' | 'image' | 'cta' | 'grid' | 'divider';
  title?: string;
  subtitle?: string;
  body?: string;
  image?: { src: string; alt: string };
  action?: { label: string; href?: string; onClick?: () => void };
  items?: Array<{ title: string; body: string; icon?: React.ReactNode }>;
  className?: string;
}

const CmsBlock: React.FC<CmsBlockProps> = ({
  type,
  title,
  subtitle,
  body,
  image,
  action,
  items = [],
  className = '',
}) => {
  const Action = action ? (
    <a href={action.href} onClick={action.onClick}
      className="inline-flex items-center h-[50px] px-8 bg-[#005BA6] text-white text-[16px] font-semibold rounded-[4px] hover:bg-[#004A84] transition-colors border-2 border-[#005BA6]">
      {action.label}
    </a>
  ) : null;

  if (type === 'hero') {
    return (
      <section className={`w-full py-20 px-6 text-center bg-[#002F48] text-white ${className}`}>
        {subtitle && <p className="text-[14px] font-semibold text-[#009CF4] uppercase tracking-widest mb-4">{subtitle}</p>}
        {title && <h1 className="text-[48px] font-light text-white mb-6 leading-tight max-w-[800px] mx-auto">{title}</h1>}
        {body && <p className="text-[18px] text-white opacity-80 mb-8 max-w-[600px] mx-auto">{body}</p>}
        {Action}
      </section>
    );
  }

  if (type === 'image') {
    return (
      <div className={`w-full overflow-hidden rounded-[4px] ${className}`}>
        {image && <img src={image.src} alt={image.alt} className="w-full h-auto object-cover" />}
        {title && <p className="mt-2 text-[12px] text-[#777777] text-center">{title}</p>}
      </div>
    );
  }

  if (type === 'cta') {
    return (
      <section className={`w-full py-16 px-6 text-center bg-[#EFF9FE] rounded-[8px] ${className}`}>
        {title && <h2 className="text-[32px] font-light text-[#002F48] mb-4">{title}</h2>}
        {body && <p className="text-[16px] text-[#777777] mb-8 max-w-[500px] mx-auto">{body}</p>}
        {Action}
      </section>
    );
  }

  if (type === 'grid') {
    return (
      <section className={`w-full py-12 px-6 ${className}`}>
        {title && <h2 className="text-[28px] font-semibold text-[#002F48] mb-8 text-center">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-3 p-6 bg-white border border-[#DCDCDC] rounded-[8px] shadow-[0_1px_4px_rgba(0,47,72,0.08)]">
              {item.icon && <div className="w-[48px] h-[48px] rounded-full bg-[#EFF9FE] flex items-center justify-center text-[#005BA6]">{item.icon}</div>}
              <h3 className="text-[16px] font-semibold text-[#4A4A4A]">{item.title}</h3>
              <p className="text-[14px] text-[#777777] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (type === 'divider') {
    return <div className={`w-full h-[1px] bg-[#DCDCDC] ${className}`} />;
  }

  // default: text
  return (
    <section className={`w-full py-8 px-6 ${className}`}>
      {title && <h2 className="text-[28px] font-semibold text-[#002F48] mb-4">{title}</h2>}
      {subtitle && <p className="text-[16px] font-semibold text-[#005BA6] mb-3">{subtitle}</p>}
      {body && <p className="text-[16px] text-[#4A4A4A] leading-relaxed mb-6">{body}</p>}
      {Action}
    </section>
  );
};

export default CmsBlock;
