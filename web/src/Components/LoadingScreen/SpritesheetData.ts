import spritesheet1 from './spritesheets/spritesheet-1.png';
import spritesheet2 from './spritesheets/spritesheet-2.png';

export interface Spritesheet {
  spritesheet: string;
  sheetwidth: number;
  sheetheight: number;
  cellwidth: number;
  frames: number;
}

const spritesheetDataArray: Spritesheet[] = [
  { spritesheet: spritesheet1, sheetwidth: 420, sheetheight: 60, cellwidth: 60, frames: 7 },
  { spritesheet: spritesheet2, sheetwidth: 300, sheetheight: 60, cellwidth: 60, frames: 5 },
];

export default spritesheetDataArray;
