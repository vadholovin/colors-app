import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function DraggableColorBox({ color, name }) {
  const handleDelete = () => {};
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
          color: 'rgba(0, 0, 0, 0.5)',
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
          onClick={handleDelete}
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
