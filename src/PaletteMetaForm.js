import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function PaletteMetaForm({ palettes, handleSubmit, openForm, handleClose }) {
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
    <Dialog open={openForm} onClose={handleClose}>
      <DialogTitle>Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => handleSubmit(paletteName)}>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

export default PaletteMetaForm;
