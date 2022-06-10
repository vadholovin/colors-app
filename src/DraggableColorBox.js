import React from 'react';
import Paper from '@mui/material/Paper';

function DraggableColorBox({ color }) {
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
      {color}
    </Paper>
  )
}

export default DraggableColorBox;
