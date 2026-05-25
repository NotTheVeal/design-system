import React from 'react';

interface NavLeftProps {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const NavLeft: React.FC<NavLeftProps> = ({ className, isOpen, onToggle }) => {
  return (
    <div className={`${className} nav-left`} style={{ 
      width: isOpen ? 'var(--ps-navLeft-expandedWidth)' : 'var(--ps-navLeft-collapsedWidth)',
      backgroundColor: 'var(--ps-navLeft.bgBody)', 
      transition: 'width 0.3s ease' 
    }}>
      <div className="nav-header" style={{ 
        height: 'var(--ps-navLeft.headerHeight)', 
        backgroundColor: 'var(--ps-navLeft.bgHeader)', 
        padding: '0 var(--ps-navLeft.headerPaddingX)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <div className="header-avatar" style={{ 
          width: 'var(--ps-navLeft.headerAvatarSize)', 
          height: 'var(--ps-navLeft.headerAvatarSize)', 
          borderRadius: '50%', 
          backgroundColor: 'var(--ps-navLeft.headerAvatarBg)' 
        }} />
        <span style={{ 
          fontSize: 'var(--ps-navLeft.headerNameFontSize)', 
          fontWeight: 'var(--ps-navLeft.headerNameFontWeight)', 
          color: 'var(--ps-navLeft.headerAvatarTextColor)' 
        }}>User Name</span>
        <button 
          className="toggle-button" 
          onClick={onToggle} 
          aria-label="Toggle navigation" 
          style={{ 
            backgroundColor: 'var(--ps-navLeft.toggleButtonBg)', 
            borderRadius: 'var(--ps-navLeft.toggleButtonRadius)', 
            width: 'var(--ps-navLeft.toggleButtonSize)', 
            height: 'var(--ps-navLeft.toggleButtonSize)', 
            color: 'var(--ps-navLeft.toggleButtonIconColor)' 
          }} 
        />
      </div>
      <div className="nav-items">
        <div className="nav-item" style={{ 
          height: 'var(--ps-navLeft.itemHeight)', 
          padding: `0 var(--ps-navLeft.itemPaddingX)`, 
          fontSize: 'var(--ps-navLeft.itemFontSize)', 
          fontWeight: 'var(--ps-navLeft.itemFontWeight)', 
          color: 'var(--ps-navLeft.textColor)', 
          transition: 'background 0.3s'
        }}
        onFocus={(e) => e.currentTarget.style.backgroundColor = 'var(--ps-navLeft.itemHoverBg)'}
        onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
          Item 1
        </div>
        {/* Add more items as needed */}
      </div>
      <style>{`
        :root {
          --ps-navLeft-bgHeader: #005BA6;
          --ps-navLeft-bgBody: #003A6B;
          --ps-navLeft-itemHoverBg: rgba(255,255,255,0.08);
          --ps-navLeft-expandedWidth: 240px;
          --ps-navLeft-collapsedWidth: 64px;
          --ps-navLeft-itemHeight: 56px;
          --ps-navLeft-headerHeight: 80px;
          --ps-navLeft-headerPaddingX: 16px;
          --ps-navLeft-textColor: #FFFFFF;
          --ps-navLeft-headerAvatarBg: #FFFFFF;
          --ps-navLeft-headerAvatarTextColor: #005BA6;
          --ps-navLeft-headerNameFontSize: 18px;
          --ps-navLeft-headerNameFontWeight: 600;
          --ps-navLeft-toggleButtonBg: #005BA6;
          --ps-navLeft-toggleButtonRadius: 100px;
          --ps-navLeft-toggleButtonSize: 48px;
          --ps-navLeft-toggleButtonIconColor: #FFFFFF;
        }
      `}</style>
    </div>
  );
};

export default NavLeft;
