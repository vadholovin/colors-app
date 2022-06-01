import React, { useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

export default function Palette({ palette }) {
  const {colors, paletteName, emoji} = palette;
  const [level, setLevel] = useState(500);
  const [colorFormat, setColorFormat] = useState('hex');
  const boxes = colors[level].map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[colorFormat]}
    />
  ));
  const changeLevel = (value) => setLevel(value);
  const changeFormat = (value) => setColorFormat(value);

  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        colorFormat={colorFormat}
        changeFormat={changeFormat}
      />
      <div className="Palette-colors">
        {boxes}
      </div>
      <footer className='Palette-footer'>
        {paletteName}
        <span>{emoji}</span>
      </footer>
    </div>
  );
}
