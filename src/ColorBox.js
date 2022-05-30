import React from 'react';
import './ColorBox.css';

export default function ColorBox({ background, name }) {
  return (
    <div className="ColorBox" style={{background}}>
      <div className="ColorBox-copy-container">
        <div className="ColorBox-content">
          <span>{name}</span>
        </div>
        <button className="ColorBox-copy-button">Copy</button>
      </div>
      <span className="ColorBox-see-more">More</span>
    </div>
  );
}
