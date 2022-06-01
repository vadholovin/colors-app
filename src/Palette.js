import { useState } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
  const changeLevel = (value) => {
    setLevel(value);
  };
  return (
    <div className="Palette">
      {/* Navbar */}
      <Slider
        defaultValue={level}
        min={100}
        max={900}
        step={100}
        onAfterChange={changeLevel}
      />
      <div className="Palette-colors">
        {boxes}
      </div>
      {/* Footer eventually */}
    </div>
  );
}
