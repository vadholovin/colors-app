import { useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

export default function Palette({ palette }) {
  const [level, setLevel] = useState(500);
  const {colors} = palette;
  const boxes = colors[level].map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color.hex}
    />
  ));
  const changeLevel = (value) => setLevel(value);
  return (
    <div className="Palette">
      <Navbar level={level} changeLevel={changeLevel} />
      <div className="Palette-colors">
        {boxes}
      </div>
      {/* Footer eventually */}
    </div>
  );
}
