import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

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
  const [openForm, setOpenForm] = useState(false);

  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };
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
        <Stack
          direction="row"
          spacing={2}
          sx={{
            marginRight: '1rem',
            alignItems: 'center',
          }}
        >
          <Button variant="contained" color="secondary" href="/">
            Go Back
          </Button>
          <Button variant="contained" onClick={handleClickOpen}>
            Save
          </Button>
        </Stack>
      </AppBar>
      {openForm && (
        <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          openForm={openForm}
        />
      )}
    </>
  );
}

export default PaletteFormNav;
