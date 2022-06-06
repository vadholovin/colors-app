import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const PREFIX = 'MiniPalette';
const classes = {
  root: `${PREFIX}-root`,
  colors: `${PREFIX}-colors`,
  title: `${PREFIX}-title`,
  emoji: `${PREFIX}-emoji`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    [`&:hover`] : {
      cursor: 'pointer'
    }
  },
  [`& .${classes.colors}`]: {
    backgroundColor: 'grey'
  },
  [`& .${classes.title}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative'
  },
  [`& .${classes.emoji}`]: {
    marginLeft: '0.5rem'
  },

}));

function MiniPalette(props) {
  const { paletteName, emoji, colors } = props;
  return (
    <Root className={classes.root}>
      <div className={classes.colors}></div>
      <h5 className={classes.title}>{paletteName} <span>{emoji}</span></h5>
    </Root>
  );
}

export default MiniPalette;
