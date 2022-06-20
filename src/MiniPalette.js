import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const PREFIX = 'MiniPalette';
const classes = {
  root: `${PREFIX}-root`,
  colors: `${PREFIX}-colors`,
  title: `${PREFIX}-title`,
  emoji: `${PREFIX}-emoji`,
  miniColor: `${PREFIX}-miniColor`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #000',
    cursor: 'pointer',
    '&:hover .MuiButtonBase-root': {
      opacity: '1',
      transition: 'all 0.3s ease-in-out',
    },
    '& a': {
      textDecoration: 'none',
    },
  },
  [`& .${classes.colors}`]: {
    backgroundColor: '#dae1e4',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  [`& .${classes.title}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative',
  },
  [`& .${classes.emoji}`]: {
    marginLeft: '0.5rem',
  },
  [`& .${classes.miniColor}`]: {
    height: '2rem',
  },
}));

function MiniPalette({ paletteName, emoji, colors, id, deletePalette }) {
  const miniColorBoxes = colors.map((color, index) => (
    <div
      key={index}
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
    />
  ));

  const handleDeletePalette = () => {
    deletePalette(id);
  };
  return (
    <Root className={classes.root}>
      <Link to={`palette/${id}`}>
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span>{emoji}</span>
        </h5>
      </Link>
      <IconButton
        aria-label="delete palette"
        onClick={handleDeletePalette}
        size="small"
        sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          borderRadius: '0',
          color: 'white',
          opacity: '0',
          backgroundColor: '#eb3d30',
          '&:hover': {
            backgroundColor: '#eb3d30',
          },
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Root>
  );
}

export default MiniPalette;
