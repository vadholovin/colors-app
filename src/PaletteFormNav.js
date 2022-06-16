import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: '64px',
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

function PaletteFormNav({ open, handleDrawerOpen, handleSubmit, palettes }) {
  const [paletteName, setPaletteName] = useState('');

  const handleChange = (evt) => {
    const value = evt.target.value;
    setPaletteName(value);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return !palettes.some(
        ({ paletteName }) => paletteName.toLowerCase() === value.toLowerCase()
      );
    });

    return () => {
      ValidatorForm.removeValidationRule('isPaletteNameUnique');
    };
  }, [paletteName, palettes]);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ValidatorForm onSubmit={() => handleSubmit(paletteName)}>
            <TextValidator
              label="Palette Name"
              variant="standard"
              name="paletteName"
              value={paletteName}
              onChange={handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Enter a palette name',
                'Palette name must be unique',
              ]}
            />
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </ValidatorForm>
          <Link to="/">
            <Button variant="contained" color="secondary" component="span">
              Go Back
            </Button>
          </Link>
        </Box>
      </AppBar>
    </>
  );
}

export default PaletteFormNav;
