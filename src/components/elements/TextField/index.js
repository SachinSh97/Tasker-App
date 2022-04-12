import React from 'react';
import Proptypes from 'prop-types';
import MaterialTextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import './TextField.scss';

const TextField = ({
  name,
  label,
  type,
  value,
  placeholder,
  variant,
  error,
  helperText,
  fullWidth,
  position,
  symbol,
  multiline,
  maxRows,
  onBlur,
  onChange,
}) => {
  return (
    <MaterialTextField
      classes={{ root: `material-textfield ${error ? 'error' : ''}` }}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      variant={variant}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      multiline={multiline}
      maxRows={maxRows}
      InputProps={
        symbol && {
          [`${position}Adornment`]: (
            <InputAdornment position={position}>{symbol}</InputAdornment>
          ),
        }
      }
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

TextField.defaultProps = {
  name: '',
  label: '',
  type: 'text',
  placeholder: '',
  variant: 'outlined',
  fullWidth: true,
  error: false,
  helperText: '',
  position: '',
  symbol: null,
  value: '',
  multiline: false,
  maxRows: '',
  onBlur: () => {},
  onChange: () => {},
};

TextField.propTypes = {
  name: Proptypes.string,
  label: Proptypes.string,
  type: Proptypes.string,
  placeholder: Proptypes.string,
  variant: Proptypes.string,
  fullWidth: Proptypes.bool,
  error: Proptypes.bool,
  helperText: Proptypes.string,
  position: Proptypes.string,
  symbol: Proptypes.element,
  value: Proptypes.string.isRequired,
  multiline: Proptypes.bool,
  maxRows: Proptypes.string,
  onBlur: Proptypes.func,
  onChange: Proptypes.func,
};

export default TextField;
