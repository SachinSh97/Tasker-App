import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MaterialSelect from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import './Select.scss';

const Select = ({
  value,
  name,
  options,
  label,
  helperText,
  error,
  handleChange,
}) => {
  return (
    <FormControl fullWidth sx={{ minWidth: 120 }} size="small" error={error}>
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <MaterialSelect
        id="material-select"
        name={name}
        classes={{ select: 'material-select' }}
        label={label}
        value={value}
        onChange={handleChange}
      >
        {options?.map((option) => (
          <MenuItem value={option?.value}>{option?.label}</MenuItem>
        ))}
      </MaterialSelect>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
