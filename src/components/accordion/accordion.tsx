import React, { useState, ReactNode } from 'react';


interface AccordionProps {
  title: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, className, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={`accordion ${className}`} id={id} role="region" aria-labelledby={title}>
      <button
        className={`accordion-header ${isOpen ? 'expanded' : ''}`}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls={`${title}-content`}
        style={{
          padding: 'var(--ps-accordion-spacing-headerPaddingY) var(--ps-accordion-spacing-headerPaddingX)',
          border: `var(--ps-accordion-border-width) solid var(--ps-accordion.color.border)`,
          borderRadius: 'var(--ps-accordion.border.radius)',
          backgroundColor: isOpen ? 'var(--ps-accordion.color.background.header.expanded)' : 'var(--ps-accordion.color.background.header.default)',
          color: 'var(--ps-accordion.color.text.header)',
        }}
      >
        {title}
      </button>
      <div
        className={`accordion-content ${isOpen ? 'visible' : ''}`}
        id={`${title}-content`}
        style={{
          padding: 'var(--ps-accordion.spacing.contentPadding)',
          backgroundColor: 'var(--ps-accordion.color.background.content)',
          borderRadius: 'var(--ps-accordion.border.radius)',
        }}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
