import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import chroma from 'chroma-js';

function DraggableColorBox({ color, name, removeColor }) {
  const isDarkBgColor = chroma(color).luminance() <= 0.08;

  const handleRemove = () => {
    removeColor(name);
  };
  return (
    <Paper
      square
      elevation={0}
      sx={{
        position: 'relative',
        height: '100%',
        backgroundColor: color,
        cursor: 'pointer',
        '&:hover svg': {
          color: 'white',
          transform: 'scale(1.3)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          fontSize: '12px',
          color: isDarkBgColor ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0,0,0,0.6)',
        }}
      >
        <Box
          component="span"
          sx={{
            p: '10px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          {name}
        </Box>
        <IconButton
          aria-label="delete color box"
          onClick={handleRemove}
          edge="start"
        >
          <DeleteIcon
            sx={{
              transition: 'all 0.3s ease-in-out',
            }}
          />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default DraggableColorBox;
