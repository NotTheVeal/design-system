import React from 'react';

const ListCard: React.FC<ListCardProps> = ({
  title,
  description,
  avatarUrl,
  onClick,
  className,
  isSelected,
  ...props
}) => {
  return (
    <div
      className={`list-card ${className} ${isSelected ? 'selected' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={title}
      {...props}
    >
      <div className="avatar" style={{ backgroundImage: `url(${avatarUrl})` }} />
      <div className="content">
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

interface ListCardProps {
  title: string;
  description: string;
  avatarUrl?: string;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
}

export default ListCard;

const styles = `
:root {
  --ps-font: 'Source Sans Pro', sans-serif;
  --ps-color-primary: #005BA6;
  --ps-color-midnight: #002F48;
  --ps-spacing-padding: 16px;
  --ps-spacing-gap: 12px;
  --ps-border-radius: 4px;
}

.list-card {
  background-color: var(--ps-color-primary);
  border-radius: var(--ps-border-radius);
  border: var(--ps-border-width) solid var(--ps-color-border-default);
  padding: var(--ps-spacing-padding);
  cursor: pointer;
  transition: box-shadow 0.2s, background-color 0.2s;
}

.list-card.selected {
  border-color: var(--ps-color-border-selected);
}

.list-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: var(--ps-sizing-avatarSize);
  height: var(--ps-sizing-avatarSize);
  border-radius: 50%;
  background-size: cover;
  margin-right: var(--ps-spacing-avatarGap);
}

.title {
  font-size: 16px;
  color: var(--ps-color-text-primary);
}

.description {
  font-size: 14px;
  color: var(--ps-color-text-secondary);
}
`;
