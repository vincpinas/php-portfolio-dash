import React from 'react';
import './Tooltip.scss';

interface TProps {
  children: React.ReactNode;
  text: string;
  className?: string;
}

function Tooltip({ children, text, className }: TProps) {
  return (
    <div className={`toolTipWrapper ${className}`}>
      { children }
      <span className={`tooltip ${className}`}>{ text }</span>
    </div>
  )
}

export default Tooltip;
