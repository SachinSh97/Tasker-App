import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import MaterialButton from '@mui/material/Button';
import './Button.scss';

const Button = ({
  rootClass,
  variant,
  startIcon,
  content,
  fullWidth,
  onClick,
}) => {
  return (
    <MaterialButton
      classes={{ root: classNames('material-button', rootClass) }}
      variant={variant}
      startIcon={startIcon}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {content}
    </MaterialButton>
  );
};

Button.defaultProps = {
  variant: 'contained',
  startIcon: null,
  content: '',
  fullwidth: false,
  onClick: () => {},
};

Button.propTypes = {
  variant: Proptypes.string,
  startIcon: Proptypes.element,
  content: Proptypes.element,
  fullwidth: Proptypes.bool,
  onClick: Proptypes.func,
};

export default Button;
