import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

function Navbar({ level, changeLevel }) {
  return (
    <div className="Navbar">
      <div className="logo">
        <a href="#">color palettes</a>
      </div>
      <div className="slider-container">
        <span>Level: {level}</span>
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}
          />
        </div>
      </div>
    </div>

  );
}

export default Navbar;
