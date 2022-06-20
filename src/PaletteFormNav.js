import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DRAWER_WIDTH } from './constants';

const drawerWidth = DRAWER_WIDTH;

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
  '& a': {
    textDecoration: 'none',
  },
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
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => {
    setFormShowing(true);
  };

  const hideForm = () => {
    setFormShowing(false);
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
            <AddCircleIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create a Palette
          </Typography>
        </Toolbar>
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
          sx={{
            marginRight: '1rem',
            alignItems: 'center',
          }}
        >
          <Link to="/">
            <Button
              variant="contained"
              size="{{xs: 'small', sm: 'medium'}}"
              color="secondary"
              component="span"
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            size="{{xs: 'small', sm: 'medium'}}"
            onClick={showForm}
          >
            Save
          </Button>
        </Stack>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          hideForm={hideForm}
          formShowing={formShowing}
        />
      )}
    </>
  );
}

export default PaletteFormNav;
