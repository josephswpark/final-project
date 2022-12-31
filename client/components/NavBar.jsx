import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import StoreIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import StyledBadge from '@mui/material/Badge';
import { Container } from '@mui/material';
import Logo from '../../server/public/black-logo.svg';

const styles = {
  navBar: {
    paddingTop: 22
  },
  logoSize: {
    width: 170
  }
};

export default class HelloWorld extends React.Component {
  render() {
    return (
      <Container max-width='lg' style={styles.navBar}>
        <Grid container direction="row">
          <Grid item xs={7.5}>
            <img src={Logo} width={180} className='logo-img'/>
          </Grid>
          <Grid container direction='row' justifyContent='right' alignItems='center' item xs={4.5} className='icon-menu' >
            <IconButton aria-label='search' href='#'><SearchIcon /></IconButton>
            <IconButton aria-label="cart">
              <StyledBadge badgeConten='' color="primary">
                <ShoppingBagIcon />
              </StyledBadge>
            </IconButton>
            <IconButton aria-label='shop' href='#'><StoreIcon /></IconButton>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
