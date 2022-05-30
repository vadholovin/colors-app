import React from 'react';
import './ColorBox.css';

export default function ColorBox({ background, name }) {
  return (
    <div className="ColorBox" style={{background}}>
      <span>{name}</span>
      <span>more</span>
    </div>
  );
}
