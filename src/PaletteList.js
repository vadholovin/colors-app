import React from 'react';
import MiniPalette from './MiniPalette';

function PaletteList({ palettes }) {
  return (
    <div>
      <h1>React Colors</h1>
      {palettes.map((palette, index) => (
        <MiniPalette {...palette} key={index} />
      ))}
    </div>
  );
}

export default PaletteList;
