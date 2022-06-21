import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page from './Page';
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
  const location = useLocation();

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
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={150}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
          <Route
            path="/palette/:paletteId"
            element={
              <Page>
                <Palette findPalette={findPalette} />
              </Page>
            }
          />
          <Route
            path="/palette/:paletteId/:colorId"
            element={
              <Page>
                <SingleColorPalette findPalette={findPalette} />
              </Page>
            }
          />
          <Route
            path="/palette/new"
            element={
              <Page>
                <NewPaletteForm palettes={palettes} savePalette={savePalette} />
              </Page>
            }
          />
          <Route
            path="*"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
