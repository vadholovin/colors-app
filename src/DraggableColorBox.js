import React from 'react';
import Paper from '@mui/material/Paper';

function DraggableColorBox({ color, name }) {
  return (
    <Paper
      square
      elevation={0}
      sx={{
        position: 'relative',
        height: '100%',
        backgroundColor: color,
      }}
    >
      {name}
    </Paper>
  )
}

export default DraggableColorBox;
