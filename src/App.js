import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import NotFound from './NotFound';
import seedColors from './seedColors';
import './styles/App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PaletteList palettes={seedColors} />} />
        <Route path="/palette/:paletteId" element={<Palette />} />
        <Route path="/palette/:paletteId/:colorId" element={<SingleColorPalette />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
