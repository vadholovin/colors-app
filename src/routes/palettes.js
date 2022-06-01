import React from 'react';
import { useParams } from 'react-router-dom';
import Palette from '../Palette';
import seedColors from '../seedColors';
import { generatePalette } from '../colorHelpers';

function Palettes(props) {
  const params = useParams();
  const palette = seedColors.find(item => item.id === params.paletteId);
  return (
    <div className='Palettes'>
      <Palette palette={generatePalette(palette)} />
    </div>
  );
}

export default Palettes;
