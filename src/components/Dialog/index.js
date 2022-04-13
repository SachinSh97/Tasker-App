import React from 'react';
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

export default MaterialDialog;
