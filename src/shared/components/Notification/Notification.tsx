import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../../RootState';
import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Notification = () => {
  const [error] = useSelector((state: RootState) => [state.weather.error]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!error);
  }, [error]);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="snack">{error}</span>}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

export default Notification;
