import * as React from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Container from '@mui/material/Container';

const styles = {
  xIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    cursor: 'pointer'
  }
};
export default function CartModal(props) {
  return (
    <Drawer {...props}
      anchor='right'
      open={props.open}
      onClose={props.onClose}
    >
      <Box style={{ width: '390px' }}>
        <span style={styles.xIcon }>
          <CloseIcon onClick={props.onClose} className='xIcon'/>
        </span>
        <Container style={{ marginLeft: '1.2rem' }}>
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '300px' }} >
            <Input placeholder='Search our store'
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
              type: 'search'
            }} style={{ fontFamily: 'eczar' }}
          />
            <div>
              <h4>Popular searches</h4>
              <ul style={{ marginTop: 0, paddingLeft: 0 }}>
                <p className='brands'>Jordan</p>
                <p className='brands'>Nike</p>
                <p className='brands'>Yeezy</p>
                <p className='brands'>Adidas</p>
                <p className='brands'>New Balance</p>
              </ul>
            </div>
          </FormControl>
        </Container>
      </Box>
    </Drawer>
  );
}
