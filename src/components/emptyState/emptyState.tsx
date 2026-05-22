import React from 'react';

interface EmptyStateProps {
  title: string;
  body: string;
  icon: React.ReactNode;
  illustration: React.ReactNode;
  className?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  body,
  icon,
  illustration,
  className,
  onPrimaryAction,
  onSecondaryAction,
}) => {
  return (
    <div className={`empty-state ${className}`} role="alert">
      <style>
        {`
          :root {
            --ps-background: {semantic.color.surface.default};
            --ps-padding-v: 48px;
            --ps-padding-h: 24px;
            --ps-icon-size: 64px;
            --ps-icon-color: {semantic.color.text.tertiary};
            --ps-illustration-size: 120px;
            --ps-title-color: {semantic.color.text.primary};
            --ps-title-font-size: 18px;
            --ps-title-font-weight: 600;
            --ps-title-margin-t: 16px;
            --ps-body-color: {semantic.color.text.secondary};
            --ps-body-font-size: 14px;
            --ps-body-font-weight: 400;
            --ps-body-max-width: 400px;
            --ps-body-margin-t: 8px;
            --ps-action-margin-t: 24px;
            --ps-action-gap: 12px;
          }
          .empty-state {
            background: var(--ps-background);
            padding: var(--ps-padding-v) var(--ps-padding-h);
            text-align: center;
          }
          .icon {
            width: var(--ps-icon-size);
            height: var(--ps-icon-size);
            color: var(--ps-icon-color);
          }
          .title {
            color: var(--ps-title-color);
            font-size: var(--ps-title-font-size);
            font-weight: var(--ps-title-font-weight);
            margin-top: var(--ps-title-margin-t);
          }
          .body {
            color: var(--ps-body-color);
            font-size: var(--ps-body-font-size);
            font-weight: var(--ps-body-font-weight);
            max-width: var(--ps-body-max-width);
            margin-top: var(--ps-body-margin-t);
          }
          .actions {
            margin-top: var(--ps-action-margin-t);
            gap: var(--ps-action-gap);
          }
          .primary-button {
            background: white;
            border: 1px solid #005BA6;
            color: #005BA6;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
          }
          .primary-button:hover {
            background: #005BA6;
            color: white;
          }
          .secondary-button {
            background: transparent;
            border: 1px solid #DCDCDC;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
          }
        `}
      </style>
      <div className="icon">{icon}</div>
      <div className="illustration">{illustration}</div>
      <h2 className="title">{title}</h2>
      <p className="body">{body}</p>
      <div className="actions">
        {onPrimaryAction && <button className="primary-button" onClick={onPrimaryAction}>Primary Action</button>}
        {onSecondaryAction && <button className="secondary-button" onClick={onSecondaryAction}>Secondary Action</button>}
      </div>
    </div>
  );
};

export default EmptyState;
