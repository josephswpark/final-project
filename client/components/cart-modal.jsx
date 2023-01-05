import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Item from '@mui/material/ListItem';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#223644'
    }
  }
});

const style = {
  box: {
    position: 'fixed',
    height: '100%',
    top: '50%',
    right: 0,
    transform: 'translate(0%, -50%)',
    width: 405,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2
  },
  img: {
    width: '150px',
    height: '150px'
  },
  xIcon: {
    width: '1rem',
    height: '1rem',
    marginLeft: '15.7rem',
    marginTop: '1.7rem'
  }
};

export default function CartModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.box}>
          <div style={{ display: 'flex' }}>
            <h3>Cart</h3>
            <p style={{ marginLeft: '0.5rem', marginTop: '1.3rem' }}>({props.qty} item)</p>
            <IconButton aria-label="exit" style={style.xIcon} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Grid container>
            <Grid item xs={6} >
              <Item style={{ padding: 0, justifyContent: 'center' }}><img style={style.img }
                  src={props.productinfo.imageUrl}
                  srcSet={props.productinfo.imageUrl}
                  alt={props.productinfo.title}
                  loading="lazy"
                /></Item>
            </Grid>

            <Grid item xs={6} style={{ marginTop: 0, marginLeft: 0 }}>
              <span>
                <p style={{
                  fontFamily: 'eczar',
                  fontWeight: 300,
                  marginBottom: 0
                }}>{props.productinfo.name} - ${props.productinfo.price}</p>
                <p style={{ marginTop: '0.1rem' }}>Size: {props.size}</p>
              </span>
            </Grid>
          </Grid>
          <Button theme={theme} color='primary' variant='contained'
            style={{ width: '370px', marginTop: '1.5rem' }} href='#checkout'>
            CHECKOUT • ${props.productinfo.price}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
