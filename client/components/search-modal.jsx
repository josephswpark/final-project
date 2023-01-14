import * as React from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

export default function CartModal(props) {
  return (
    <Drawer {...props}
      anchor='right'
      open={props.open}
      onClose={props.onClose}
    >
      <Box style={{ width: 390 }}>
        <IconButton aria-label="exit" onClick={props.onClose} size='small' >
          <CloseIcon fontSize='small' />
        </IconButton>
        {/* <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <InputLabel htmlFor="standard-adornment-search">Search</InputLabel>
          <TextField id="standard-basic" variant="standard" />
          </Box> */}
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
          <Input
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight'
            }}
          />
          <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
        </FormControl>

      </Box>
    </Drawer>
  );
}
