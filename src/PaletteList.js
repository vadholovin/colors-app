import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MiniPalette from './MiniPalette';

function PaletteList({ palettes, deletePalette }) {
  return (
    <Box
      sx={{
        backgroundColor: 'blue',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Container maxWidth="md">
        <Box
          component="nav"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            color: 'white',
            '& a': {
              color: 'inherit',
            },
          }}
        >
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {palettes.map((palette, index) => (
            <Grid key={index} item xs={4} sm={4} md={4}>
              <MiniPalette {...palette} deletePalette={deletePalette} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default PaletteList;
