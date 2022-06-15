import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import NotFound from './NotFound';
import seedColors from './seedColors';
import './styles/App.css';

function App() {
  const [palettes, setPalettes] = useState(seedColors);
  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  const findPalette = (id) => {
    return palettes.find((item) => item.id === id);
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<PaletteList palettes={palettes} />} />
        <Route
          path="/palette/:paletteId"
          element={<Palette findPalette={findPalette} />}
        />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPalette findPalette={findPalette} />}
        />
        <Route
          path="/palette/new"
          element={
            <NewPaletteForm palettes={palettes} savePalette={savePalette} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
