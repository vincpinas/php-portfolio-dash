import React, { useState } from 'react';
import './Loading.scss';
import sheetarray from './SpritesheetData';

interface loadProps {
  text: string;
}

function LoadingScreen({ text }: loadProps) {
  const random = (array: any[]) => {
    let temp = Math.floor(Math.random() * array.length);
    return array[temp];
  }
  const [sheet, setSheet] = useState(random(sheetarray));
  
  const charStyle = {
    width: `${sheet.cellwidth}px`,
    height: `${sheet.sheetheight}px`
  }

  const sheetStyle = {
    animation: `moveSpritesheet ${sheet.frames*0.15}s steps(${sheet.frames}) infinite`
  }

  return (
    <div id='loadComponent'>
      <div className="character" style={charStyle}>
        <img className="spritesheet" src={sheet.spritesheet} style={sheetStyle} />
      </div>
      <h4>{text}</h4>
    </div>
  )
}

export default LoadingScreen;
