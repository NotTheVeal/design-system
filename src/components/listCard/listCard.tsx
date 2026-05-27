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
