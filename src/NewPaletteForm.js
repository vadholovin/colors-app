import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { v4 as uuid } from 'uuid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import DraggableColorBox from './DraggableColorBox';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: '100vh',
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function NewPaletteForm({ palettes, savePalette, maxColors = 20 }) {
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(palettes[0].colors);
  let navigate = useNavigate();
  let paletteIsFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const handleSubmit = (paletteName) => {
    const newPalette = {
      id: paletteName.toLowerCase().replace(/ /g, '-'),
      paletteName,
      colors,
    };
    savePalette(newPalette);
    navigate('/');
  };

  const removeColor = (colorName) => {
    setColors(colors.filter(({ name }) => name !== colorName));
  };

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = palettes.map((p) => p.colors).flat();
    const rand = Math.round(Math.random() * allColors.length);
    setColors([...colors, allColors[rand]]);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
        palettes={palettes}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <Box>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={clearColors}
          >
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={addRandomColor}
            disabled={paletteIsFull}
          >
            Random Color
          </Button>
        </Box>
        <ColorPickerForm
          colors={colors}
          paletteIsFull={paletteIsFull}
          addNewColor={addNewColor}
        />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {colors.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridTemplateRows: 'repeat(4, 1fr)',
              height: 'calc(100vh - 64px)',
            }}
          >
            {colors.map((color) => (
              <Box key={uuid()}>
                <DraggableColorBox
                  color={color.color}
                  name={color.name}
                  removeColor={removeColor}
                />
              </Box>
            ))}
          </Box>
        )}
      </Main>
    </Box>
  );
}

export default NewPaletteForm;
