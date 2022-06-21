import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import DraggableColorBox from './DraggableColorBox';
import { DRAWER_WIDTH } from './constants';
import './styles/NewPaletteForm.css';

const drawerWidth = DRAWER_WIDTH;

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
  width: '100%',
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

  const handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = colors;
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
    <div className="NewPaletteForm">
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
            alignItems: 'center',
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            height: '100%',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <ButtonGroup
            variant="contained"
            sx={{
              width: '100%',
              marginBottom: '2rem',
            }}
          >
            <Button color="error" size="small" fullWidth onClick={clearColors}>
              Clear Palette
            </Button>
            <Button
              color="primary"
              size="small"
              fullWidth
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </ButtonGroup>
          <ColorPickerForm
            colors={colors}
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
          />
        </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {colors.length > 0 && (
          <div className="NewPaletteForm-colors">
            {colors.map((color) => (
              <Box key={uuid()}>
                <DraggableColorBox
                  color={color.color}
                  name={color.name}
                  removeColor={removeColor}
                />
              </Box>
            ))}
          </div>
        )}
      </Main>
    </div>
  );
}

export default NewPaletteForm;
