import React from 'react';
import Proptypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Button = React.lazy(() => import('components/elements/Button'));

const MaterialDialog = ({
  open,
  classes,
  title,
  children,
  footer,
  handleClose,
}) => {
  return (
    <Dialog classes={classes} open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{footer}</DialogActions>
    </Dialog>
  );
};

MaterialDialog.defaultProps = {
  open: false,
  classes: '',
  title: '',
  children: '',
  footer: '',
  handleClose: '',
};

MaterialDialog.propTypes = {
  open: Proptypes.bool,
  classes: Proptypes.objectOf(Proptypes.string),
  title: Proptypes.node,
  children: Proptypes.node,
  footer: Proptypes.node,
  handleClose: Proptypes.func,
};

export default MaterialDialog;
