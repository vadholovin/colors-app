import React, { useState, useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import EmojiPicker from './EmojiPicker';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function PaletteMetaForm({ palettes, handleSubmit, hideForm }) {
  const [paletteName, setPaletteName] = useState('');
  const [stage, setStage] = useState('form');

  const handleChange = (evt) => {
    const value = evt.target.value;
    setPaletteName(value);
  };

  const showEmojiPicker = () => {
    setStage('emoji');
  };

  const savePalette = (emoji) => {
    const newPalette = {
      emoji: emoji.native,
      paletteName: paletteName,
    };
    handleSubmit(newPalette);
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
      <Dialog open={stage === 'emoji'} onClose={hideForm}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <EmojiPicker title="Pick a Palette Emoji" onEmojiSelect={savePalette} />
      </Dialog>
      <Dialog open={stage === 'form'} onClose={hideForm}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              variant="standard"
              fullWidth
              margin="normal"
              name="paletteName"
              value={paletteName}
              onChange={handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Enter a palette name',
                'Palette name must be unique',
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
}

export default PaletteMetaForm;
