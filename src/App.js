import React from 'react';
import { Link } from 'react-router-dom';
// import Palette from './Palette';
import seedColors from './seedColors';
// import { generatePalette } from './colorHelpers';
import './App.css';

function App() {
  const palettes = seedColors.map((palette) => (
    <div className="PalettesCard" key={palette.id}>
      <Link to={`palette/${palette.id}`}>
        <div className="Palettes-card-footer">
          {palette.paletteName}
          <span>{palette.emoji}</span>
        </div>
      </Link>
    </div>
  ));
  return (
    <div className='Grid'>
      {palettes}
      {/* <Palette palette={generatePalette(seedColors[4])} /> */}
    </div>
  );
}

export default App;
