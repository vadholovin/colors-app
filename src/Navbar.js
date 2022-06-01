import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'rc-slider/assets/index.css';
import './Navbar.css';

function Navbar(props) {
  const { level, changeLevel, colorFormat, changeFormat } = props;
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left'
  });
  const { open, vertical, horizontal } = state;
  const handleFormatChange = (event) => {
    changeFormat(event.target.value);
    setState({...state, open: true});
  }
  const closeSnackbar = () => {
    setState({ ...state, open: false });
  }

  return (
    <div className="Navbar">
      <div className="logo">
        <Link to="/">color palettes</Link>
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
        <Select variant="standard" value={colorFormat} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255,1)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{vertical, horizontal}}
        open={open}
        message={<span>Fromat changed to {colorFormat}!</span>}
        autoHideDuration={3000}
        action={(
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        onClose={closeSnackbar}
      />
    </div>

  );
}

export default Navbar;
