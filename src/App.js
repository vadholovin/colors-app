import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import NotFound from './NotFound';
import seedColors from './seedColors';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PaletteList palettes={seedColors} />} />
        <Route path="/palette/:id" element={<Palette />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
