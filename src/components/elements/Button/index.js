import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import MaterialButton from '@mui/material/Button';

const Button = ({
  rootClass,
  variant,
  startIcon,
  content,
  fullWidth,
  disabled,
  onClick,
}) => {
  return (
    <MaterialButton
      classes={{ root: classNames('material-button', rootClass) }}
      variant={variant}
      startIcon={startIcon}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </MaterialButton>
  );
};

Button.defaultProps = {
  rootClass: '',
  variant: 'contained',
  startIcon: null,
  content: '',
  fullwidth: false,
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  rootClass: Proptypes.string,
  variant: Proptypes.string,
  startIcon: Proptypes.element,
  content: Proptypes.node,
  fullwidth: Proptypes.bool,
  onClick: Proptypes.func,
};

export default Button;
