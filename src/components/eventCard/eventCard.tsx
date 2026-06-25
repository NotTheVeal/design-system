import React from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export type EventType = 'service' | 'maintenance' | 'inspection' | 'delivery';
export type EventStatus = 'upcoming' | 'completed' | 'cancelled';

export interface EventCardProps {
  title: string;
  date: string;
  month: string;
  type: EventType;
  time?: string;
  location?: string;
  status?: EventStatus;
  onClick?: () => void;
  className?: string;
}

const TYPE_CONFIG: Record<EventType, { label: string; color: string; bg: string }> = {
  service:     { label: 'Service',     color: '#005BA6', bg: '#EFF9FE' },
  maintenance: { label: 'Maintenance', color: '#B45309', bg: '#FFF7ED' },
  inspection:  { label: 'Inspection',  color: '#0E7C55', bg: '#ECFDF5' },
  delivery:    { label: 'Delivery',    color: '#777777', bg: '#F5F5F5' },
};

const STATUS_CONFIG: Record<EventStatus, { label: string; color: string }> = {
  upcoming:  { label: 'Upcoming',  color: '#005BA6' },
  completed: { label: 'Completed', color: '#0E7C55' },
  cancelled: { label: 'Cancelled', color: '#E00000' },
};

export const EventCard: React.FC<EventCardProps> = ({
  title, date, month, type, time, location, status = 'upcoming', onClick, className = '',
}) => {
  const [hovered, setHovered] = React.useState(false);
  const typeConf = TYPE_CONFIG[type];
  const statusConf = STATUS_CONFIG[status];

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        display: 'flex', alignItems: 'stretch', gap: 0,
        background: '#FFFFFF', border: '1px solid #DCDCDC', borderRadius: 4,
        overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', fontFamily: FONT,
        boxShadow: hovered ? '0 2px 10px rgba(0,47,72,0.10)' : 'none',
        transition: 'box-shadow 150ms ease', width: '100%',
      }}
    >
      <div style={{ width: 64, background: '#005BA6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px 8px', flexShrink: 0 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>{date}</span>
        <span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.8)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{month}</span>
      </div>
      <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#4A4A4A', lineHeight: 1.3, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: statusConf.color, whiteSpace: 'nowrap', flexShrink: 0, paddingTop: 1 }}>{statusConf.label}</span>
        </div>
        <div>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, color: typeConf.color, background: typeConf.bg, borderRadius: 3, padding: '2px 8px' }}>{typeConf.label}</span>
        </div>
        {(time || location) && (
          <div style={{ display: 'flex', gap: 12, marginTop: 2 }}>
            {time && <span style={{ fontSize: 12, color: '#777777' }}>{time}</span>}
            {location && <span style={{ fontSize: 12, color: '#777777', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{location}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
