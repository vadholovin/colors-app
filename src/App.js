import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import NotFound from './NotFound';
import seedColors from './seedColors';
import './styles/App.css';
import './styles/transitions.css';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const syncLocalStorage = (palettes) => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  };

  const savePalette = (newPalette) => {
    const changedPalettes = [...palettes, newPalette];
    setPalettes(changedPalettes);
    syncLocalStorage(changedPalettes);
  };

  const deletePalette = (paletteId) => {
    const changedPalettes = palettes.filter(
      (palette) => palette.id !== paletteId
    );
    setPalettes(changedPalettes);
    syncLocalStorage(changedPalettes);
  };

  const findPalette = (id) => {
    return palettes.find((item) => item.id === id);
  };
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PaletteList palettes={palettes} deletePalette={deletePalette} />
          }
        />
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
