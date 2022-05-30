import React from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

export default function Palette({ colors, emoji, id, paletteName }) {
  const boxes = colors.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color.color}
    />
  ));
  return (
    <div className="Palette">
      {/* Navbar */}
      <div className="Palette-colors">
        {boxes}
      </div>
      {/* Footer eventually */}
    </div>
  );
}
