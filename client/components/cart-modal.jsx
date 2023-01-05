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
    },
    secondary: {
      main: '#223644'
    }
  }

});

const style = {
  box: {
    position: 'fixed',
    height: '39%',
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
    <div>
      <Modal {...props}
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-product"
        aria-describedby="modal-modal-info"
      >
        <Box sx={style.box}>
          <div style={{ display: 'flex', height: '50px' }}>
            <h4 style={{ width: '300px', marginTop: '0.8rem' }}>Successfully Added to Cart!</h4>
            <IconButton aria-label="exit" style={style.xIcon} onClick={props.onClose} size='small'>
              <CloseIcon fontSize='small'/>
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
            style={{ width: '340px', marginLeft: '0.5rem' }} href='#cart'>
            Go To Cart • ${props.productinfo.price}
          </Button>
          <Button variant='outlined' theme={theme} color='secondary' style={{ width: '340px', marginTop: '1rem', marginLeft: '0.5rem' }} onClick={props.onClose}>
            Continue Shopping
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
