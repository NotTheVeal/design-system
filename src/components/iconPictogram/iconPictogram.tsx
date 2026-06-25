import React from 'react';

export type PictogramBackground = 'light' | 'subtle' | 'dark';
export type PictogramSize = 'sm' | 'md' | 'lg' | 'xl';
export type PictogramName =
  | 'equipment'
  | 'medical'
  | 'wrench'
  | 'hospital'
  | 'order'
  | 'shield'
  | 'analytics'
  | 'delivery';

export interface IconPictogramProps {
  /** Which pictogram illustration to show */
  name?: PictogramName;
  /** Background color style */
  background?: PictogramBackground;
  /** Overall size */
  size?: PictogramSize;
  /** Accessible label */
  'aria-label'?: string;
  className?: string;
}

const SIZE_MAP: Record<PictogramSize, number> = {
  sm: 48,
  md: 64,
  lg: 80,
  xl: 96,
};

const BG_MAP: Record<PictogramBackground, string> = {
  light: '#FFFFFF',
  subtle: '#FAFAFA',
  dark: '#002F48',
};

const BORDER_MAP: Record<PictogramBackground, string> = {
  light: '#E5E7EB',
  subtle: '#E5E7EB',
  dark: 'none',
};

// Artwork color changes based on background
function artColor(bg: PictogramBackground): { primary: string; secondary: string; accent: string } {
  if (bg === 'dark') {
    return { primary: '#FFFFFF', secondary: 'rgba(255,255,255,0.5)', accent: '#009CF4' };
  }
  return { primary: '#005BA6', secondary: '#002F48', accent: '#009CF4' };
}

// ─── Individual Pictogram Artwork ────────────────────────────────────────────

function EquipmentArt({ c }: { c: ReturnType<typeof artColor> }) {
  return (
    <g>
      {/* Monitor body */}
      <rect x="-18" y="-14" width="36" height="22" rx="2" fill="none" stroke={c.primary} strokeWidth="2" />
      {/* Screen */}
      <rect x="-14" y="-11" width="28" height="15" rx="1" fill={c.accent} fillOpacity="0.2" stroke={c.accent} strokeWidth="1" />
      {/* Stand */}
      <line x1="0" y1="8" x2="0" y2="14" stroke={c.primary} strokeWidth="2" strokeLinecap="round" />
      <line x1="-8" y1="14" x2="8" y2="14" stroke={c.primary} strokeWidth="2" strokeLinecap="round" />
      {/* Screen content lines */}
      <line x1="-9" y1="-5" x2="9" y2="-5" stroke={c.primary} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="-9" y1="-1" x2="5" y2="-1" stroke={c.secondary} strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

function MedicalArt({ c }: { c: ReturnType<typeof artColor> }) {
  return (
    <g>
      {/* Cross shape */}
      <rect x="-6" y="-16" width="12" height="32" rx="3" fill={c.primary} fillOpacity="0.15" stroke={c.primary} strokeWidth="2" />
      <rect x="-16" y="-6" width="32" height="12" rx="3" fill={c.primary} fillOpacity="0.15" stroke={c.primary} strokeWidth="2" />
      {/* Center dot */}
      <circle cx="0" cy="0" r="3" fill={c.accent} />
    </g>
  );
}

function WrenchArt({ c }: { c: ReturnType<typeof artColor> }) {
  return (
    <g>
      {/* Wrench head */}
      <path
        d="M8,-16 C14,-16 18,-12 18,-6 C18,-2 16,1 13,3 L-10,18 C-12,20 -15,20 -17,18 C-19,16 -19,13 -17,11 L6,0 C8,-2 8,-4 6,-6 C4,-8 4,-12 6,-14 Z"
        fill="none"
        stroke={c.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wrench head circle */}
      <circle cx="10" cy="-10" r="5" fill="none" stroke={c.accent} strokeWidth="1.5" />
      {/* Handle end circle */}
      <circle cx="-14" cy="15" r="2.5" fill={c.primary} />
    </g>
  );
}

function HospitalArt({ c }: { c: ReturnType<typeof artColor> }) {
  return (
    <g>
      {/* Building */}
      <rect x="-16" y="-10" width="32" height="26" rx="2" fill="none" stroke={c.primary} strokeWidth="2" />
      {/* Roof peak */}
      <polyline points="-20,-10 0,-20 20,-10" fill="none" stroke={c.primary} strokeWidth="2" strokeLinejoin="round" />
      {/* Door */}
      <rect x="-5" y="6" width="10" height="10" rx="1" fill={c.accent} fillOpacity="0.3" stroke={c.primary} strokeWidth="1.5" />
      {/* Windows */}
      <rect x="-13" y="-4" width="8" height="7" rx="1" fill={c.accent} fillOpacity="0.3" stroke={c.accent} strokeWidth="1" />
      <rect x="5" y="-4" width="8" height="7" rx="1" fill={c.accent} fillOpacity="0.3" stroke={c.accent} strokeWidth="1" />
      {/* Cross on door */}
      <line x1="0" y1="8" x2="0" y2="14" stroke={c.primary} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="-3" y1="11" x2="3" y2="11" stroke={c.primary} strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

function OrderArt({ c }: { c: ReturnType<typeof artColor> }) {
  return (
    <g>
      {/* Clipboard */}
      <rect x="-14" y="-16" width="28" height="32" rx="2" fill="none" stroke={c.primary} strokeWidth="2" />
      {/* Clip */}
      <rect x="-6" y="-18" width="12" height="5" rx="2" fill={c.primary} />
      {/* Lines */}
      <line x1="-9" y1="-4" x2="9" y2="-4" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="-9" y1="2" x2="9" y2="2" stroke={c.secondary} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="-9" y1="8" x2="5" y2="8" stroke={c.secondary} strokeWidth="1.5" strokeLinecap="round" />
      {/* Checkmark */}
      <polyline points="-2,14 0,16 5,10" fill="none" stroke={c.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function ShieldArt({ c }: { c: ReturnType<typeof artColor> }) {
  return (
    <g>
      {/* Shield */}
      <path
        d="M0,-18 L16,-12 L16,2 C16,12 8,18 0,20 C-8,18 -16,12 -16,2 L-16,-12 Z"
        fill={c.primary}
        fillOpacity="0.12"
        stroke={c.primary}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Checkmark inside */}
      <polyline
        points="-7,1 -2,7 8,-5"
        fill="none"
        stroke={c.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function AnalyticsArt({ c }: { c: ReturnType<typeof artColor> }) {
  return (
    <g>
      {/* Chart frame */}
      <line x1="-16" y1="-16" x2="-16" y2="14" stroke={c.primary} strokeWidth="2" strokeLinecap="round" />
      <line x1="-16" y1="14" x2="16" y2="14" stroke={c.primary} strokeWidth="2" strokeLinecap="round" />
      {/* Bars */}
      <rect x="-12" y="2" width="6" height="12" rx="1" fill={c.primary} />
      <rect x="-3" y="-8" width="6" height="22" rx="1" fill={c.accent} />
      <rect x="6" y="-2" width="6" height="16" rx="1" fill={c.secondary} fillOpacity={c.secondary === '#002F48' ? 0.7 : 1} />
      {/* Trend line */}
      <polyline
        points="-9,-2 0,-12 9,-6"
        fill="none"
        stroke={c.accent}
        strokeWidth="1.5"
        strokeDasharray="2,2"
        strokeLinecap="round"
      />
    </g>
  );
}

function DeliveryArt({ c }: { c: ReturnType<typeof artColor> }) {
  return (
    <g>
      {/* Truck body */}
      <rect x="-16" y="-8" width="24" height="16" rx="2" fill="none" stroke={c.primary} strokeWidth="2" />
      {/* Cab */}
      <path d="M8,-8 L16,-8 L18,2 L8,2 Z" fill="none" stroke={c.primary} strokeWidth="2" strokeLinejoin="round" />
      {/* Windshield */}
      <rect x="9" y="-6" width="7" height="6" rx="1" fill={c.accent} fillOpacity="0.3" stroke={c.accent} strokeWidth="1" />
      {/* Wheels */}
      <circle cx="-8" cy="10" r="4" fill="none" stroke={c.primary} strokeWidth="2" />
      <circle cx="-8" cy="10" r="1.5" fill={c.primary} />
      <circle cx="12" cy="10" r="4" fill="none" stroke={c.primary} strokeWidth="2" />
      <circle cx="12" cy="10" r="1.5" fill={c.primary} />
      {/* Box inside */}
      <rect x="-12" y="-5" width="12" height="10" rx="1" fill={c.accent} fillOpacity="0.15" stroke={c.accent} strokeWidth="1" />
    </g>
  );
}

const PICTOGRAM_MAP: Record<PictogramName, React.FC<{ c: ReturnType<typeof artColor> }>> = {
  equipment: EquipmentArt,
  medical: MedicalArt,
  wrench: WrenchArt,
  hospital: HospitalArt,
  order: OrderArt,
  shield: ShieldArt,
  analytics: AnalyticsArt,
  delivery: DeliveryArt,
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const IconPictogram: React.FC<IconPictogramProps> = ({
  name = 'equipment',
  background = 'light',
  size = 'md',
  'aria-label': ariaLabel,
  className,
}) => {
  const px = SIZE_MAP[size];
  const bgFill = BG_MAP[background];
  const borderColor = BORDER_MAP[background];
  const borderWidth = borderColor === 'none' ? 0 : 1.5;
  const r = px * 0.125; // border-radius
  const c = artColor(background);
  const ArtComponent = PICTOGRAM_MAP[name] || EquipmentArt;

  // Scale art to fill the icon nicely — art is drawn on a ~40px canvas
  const scale = px / 80;

  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel || `${name} pictogram`}
      className={className}
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      {/* Background tile */}
      <rect
        x={borderWidth / 2}
        y={borderWidth / 2}
        width={px - borderWidth}
        height={px - borderWidth}
        rx={r}
        ry={r}
        fill={bgFill}
        stroke={borderColor === 'none' ? 'none' : borderColor}
        strokeWidth={borderWidth}
      />

      {/* Artwork, centered and scaled */}
      <g transform={`translate(${px / 2}, ${px / 2}) scale(${scale})`}>
        <ArtComponent c={c} />
      </g>
    </svg>
  );
};

export default IconPictogram;
