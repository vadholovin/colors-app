import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import { ChromePicker } from 'react-color';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function NewPaletteForm() {
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('teal');
  const [currentName, setCurrentName] = useState('');
  const [colors, setColors] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newCurrentColor) => {
    setCurrentColor(newCurrentColor.hex);
  };

  const addNewColor = () => {
    setColors([...colors, {name: currentName, color: currentColor}]);
    setCurrentName('');
  }

  const handleNameChange = (evt) => {
    const name = evt.target.value.trim();
    setCurrentName(name);
  }

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      value = value.trim().toLowerCase();
      return !colors.some(({ name }) => name.toLowerCase() === value);
    });

    ValidatorForm.addValidationRule('isColorUnique', () => {
      return !colors.some(({ color }) => color.toLowerCase() === currentColor);
    });

    return () => {
      ValidatorForm.removeValidationRule('isColorNameUnique');
      ValidatorForm.removeValidationRule('isColorUnique');
    };
  }, [colors, currentName, currentColor]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
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
        <Typography variant='h4'>Design Your Palette</Typography>
        <Box>
          <Button variant='contained' color='error' size='small'>Clear Palette</Button>
          <Button variant='contained' color='primary' size='small'>Random Palette</Button>
        </Box>
        <ChromePicker
          color={currentColor}
          onChangeComplete={updateCurrentColor}
        />
        <ValidatorForm
          onSubmit={addNewColor}
        >
          <TextValidator
            value={currentName}
            onChange={handleNameChange}
            validators={[
              'required',
              'isColorNameUnique',
              'isColorUnique',
            ]}
            errorMessages={[
              'Enter a color name',
              'Color name must be unique',
              'Color must be unique',
            ]}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            size="large"
            sx={{backgroundColor: currentColor}}
          >
            Add Color
          </Button>
        </ValidatorForm>
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
                <DraggableColorBox color={color.color} name={color.name} />
              </Box>
            ))}
          </Box>
        )}
      </Main>
    </Box>
  )
}

export default NewPaletteForm;
