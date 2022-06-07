import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

function SingleColorPalette() {
  const { paletteId, colorId } = useParams();
  const currentPalette = generatePalette(findPalette(paletteId));
  const shades = gatherShades(currentPalette, colorId);

  console.log(shades);

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
      background={color.hex}
      showLink={false}
    />
  ));

  return (
    <div className="Palette">
      {/* <Navbar
        level={level}
        changeLevel={changeLevel}
        colorFormat={colorFormat}
        changeFormat={changeFormat}
      /> */}
      <div className="Palette-colors">
        {boxes}
      </div>
      <footer className='Palette-footer'>
        {/* {paletteName}
        <span>{emoji}</span> */}
      </footer>
    </div>
  )
}

export default SingleColorPalette;
