import React, {useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import './Palette.css';

function SingleColorPalette() {
  const { paletteId, colorId } = useParams();
  const currentPalette = generatePalette(findPalette(paletteId));
  const {paletteName, emoji} = currentPalette;
  const shades = gatherShades(currentPalette, colorId);
  const [colorFormat, setColorFormat] = useState('hex');

  function findPalette(id) {
    return seedColors.find(item => item.id === id);
  }

  function gatherShades(palette, colorToFilterBy) {
    let shades = [];
    const allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].find(color => color.id === colorToFilterBy)
      );
    }

    return shades.slice(1);
  }

  const boxes = shades.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[colorFormat]}
      showLink={false}
    />
  ));

  const changeFormat = (value) => setColorFormat(value);

  return (
    <div className="SingleColorPalette Palette">
      <Navbar
        colorFormat={colorFormat}
        changeFormat={changeFormat}
        showLevelSlider={false}
      />
      <div className="Palette-colors">
        {boxes}
        <div className="ColorBox ColorBox--go-back">
          <Link to={`/palette/${paletteId}`} className="ColorBox-back-button">Go Back</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  )
}

export default SingleColorPalette;
