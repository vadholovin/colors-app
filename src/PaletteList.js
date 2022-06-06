import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MiniPalette from './MiniPalette';

function PaletteList({ palettes }) {
  return (
    <Box
      sx={{
        backgroundColor: 'blue',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
    >
      <Container maxWidth="md">
        <Box
          component="nav"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h1>React Colors</h1>
          <span>Create Palette</span>
        </Box>

        <Grid container spacing={4}>
          {palettes.map((palette, index) => (
            <MiniPalette {...palette} key={index} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default PaletteList;
