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
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const syncLocalStorage = (newPalettes) => {
    window.localStorage.setItem('palettes', JSON.stringify(newPalettes));
  };

  const savePalette = (newPalette) => {
    const newPalettes = [...palettes, newPalette];
    setPalettes(newPalettes);
    syncLocalStorage(newPalettes);
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
