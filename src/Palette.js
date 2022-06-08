import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import './Palette.css';

function Palette() {
  const { paletteId } = useParams();
  const currentPalette = generatePalette(findPalette(paletteId));
  const {colors, paletteName, emoji} = currentPalette;
  const [level, setLevel] = useState(500);
  const [colorFormat, setColorFormat] = useState('hex');
  const boxes = colors[level].map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[colorFormat]}
      moreUrl={`/palette/${paletteId}/${color.id}`}
      isShowingFullPalette={true}
    />
  ));
  const changeLevel = (value) => setLevel(value);
  const changeFormat = (value) => setColorFormat(value);

  function findPalette(id) {
    return seedColors.find(item => item.id === id);
  }

  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        colorFormat={colorFormat}
        changeFormat={changeFormat}
        isShowingFullPalette={true}
      />
      <div className="Palette-colors">{boxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default Palette;
