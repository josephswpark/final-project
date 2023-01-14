import * as React from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';

const style = {
  box: {
    position: 'fixed',
    height: '350px',
    top: '30%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 390,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: '1rem'
  },
  img: {
    width: '150px',
    height: '150px'
  },
  xIcon: {
    width: '1rem',
    height: '1rem',
    marginLeft: '2.5rem',
    marginTop: '1rem'
  }
};

export default function CartModal(props) {
  return (
    <Drawer {...props}
        anchor='right'
        open={props.open}
        onClose={props.onClose}
      >
      <Box style={{ width: 390 }} onClick={ props.onClose} onKeyDown={props.onClose}>
        <IconButton aria-label="exit" style={style.xIcon} onClick={props.onClose} size='small' >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>
    </Drawer>
  );
}
