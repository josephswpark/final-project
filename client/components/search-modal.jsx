import * as React from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';

export default function CartModal(props) {
  return (
    <Drawer {...props}
      anchor='right'
      open={props.open}
      onClose={props.onClose}
    >
      <Box style={{ width: 390 }} onClick={props.onClose} onKeyDown={props.onClose}>
        <IconButton aria-label="exit" onClick={props.onClose} size='small' >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>
    </Drawer>
  );
}
