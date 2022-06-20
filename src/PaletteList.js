import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { green, red } from '@mui/material/colors';
import MiniPalette from './MiniPalette';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function PaletteList({ palettes, deletePalette }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  const openDialog = (id) => {
    setOpenDeleteDialog(true);
    setDeletingId(id);
  };
  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingId('');
  };

  const handleDelete = () => {
    deletePalette(deletingId);
    closeDialog();
  };

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
          <TransitionGroup component={null}>
            {palettes.map((palette, index) => (
              <CSSTransition key={index} timeout={500} classNames="fade">
                <Grid item xs={4} sm={4} md={4}>
                  <MiniPalette
                    {...palette}
                    deletePalette={deletePalette}
                    openDialog={openDialog}
                    closeDialog={closeDialog}
                    // acceptDeletion={acceptDeletion}
                  />
                </Grid>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Grid>
      </Container>
      <Dialog open={openDeleteDialog} onClose={closeDialog}>
        <DialogTitle>Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: green[100], color: green[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Delete</ListItemText>
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Cancel</ListItemText>
          </ListItem>
        </List>
      </Dialog>
    </Box>
  );
}

export default PaletteList;
