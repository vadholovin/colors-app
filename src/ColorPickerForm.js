import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function ColorPickerForm({ colors, addNewColor, paletteIsFull }) {
  const [colorName, setColorName] = useState('');
  const [colorValue, setColorValue] = useState('teal');

  const updateCurrentColor = (newCurrentColor) => {
    setColorValue(newCurrentColor.hex);
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setColorName(value);
  };
  const handleSubmit = () => {
    const newColor = { name: colorName, color: colorValue };
    addNewColor(newColor);
    setColorName('');
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return !colors.some(
        ({ name }) => name.toLowerCase() === value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule('isColorUnique', () => {
      return !colors.some(({ color }) => color.toLowerCase() === colorValue);
    });

    return () => {
      ValidatorForm.removeValidationRule('isColorNameUnique');
      ValidatorForm.removeValidationRule('isColorUnique');
    };
  }, [colors, colorName, colorValue]);
  return (
    <>
      <ChromePicker
        width={'100%'}
        color={colorValue}
        onChangeComplete={updateCurrentColor}
      />
      <ValidatorForm
        onSubmit={handleSubmit}
        instantValidate={false}
        style={{
          width: '100%',
          marginTop: '1.25rem',
        }}
      >
        <TextValidator
          label="Color Name"
          variant="filled"
          name="colorName"
          value={colorName}
          onChange={handleChange}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'Enter a color name',
            'Color name must be unique',
            'Color must be unique',
          ]}
          sx={{
            width: '100%',
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            width: '100%',
            marginTop: '1rem',
            backgroundColor: !paletteIsFull ? colorValue : null,
          }}
          disabled={paletteIsFull}
        >
          {paletteIsFull ? 'Full Palette' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </>
  );
}

export default ColorPickerForm;
