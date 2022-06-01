import React from 'react';
import Slider from 'rc-slider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import 'rc-slider/assets/index.css';
import './Navbar.css';

function Navbar(props) {
  const { level, changeLevel, colorFormat, changeFormat } = props;

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
      <div className="select-container">
        <Select value={colorFormat} onChange={changeFormat}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255,1)</MenuItem>
        </Select>
      </div>
    </div>

  );
}

export default Navbar;
