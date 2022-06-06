import React from 'react';
import { Link } from 'react-router-dom';

function PaletteList({ palettes }) {
  return (
    <div>
      <h1>React Colors</h1>
      {palettes.map(({paletteName, id, emoji, colors}) => (
        <div key={id}>
          <Link to={`palette/${id}`}>
            <div className="Palettes-card-footer">
              {paletteName}
              <span>{emoji}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PaletteList;
