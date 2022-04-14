import React from 'react';
import Proptypes from 'prop-types';
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
        {options?.map((option, index) => (
          <MenuItem key={index} value={option?.value}>
            {option?.label}
          </MenuItem>
        ))}
      </MaterialSelect>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

Select.defaultProps = {
  value: '',
  name: '',
  options: [],
  label: '',
  helperText: '',
  error: false,
  handleChange: () => {},
};

Select.propTypes = {
  value: Proptypes.string,
  name: Proptypes.string,
  options: Proptypes.arrayOf(Proptypes.object),
  label: Proptypes.string,
  helperText: Proptypes.string,
  error: Proptypes.bool,
  handleChange: Proptypes.func,
};

export default Select;
