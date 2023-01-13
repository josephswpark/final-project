import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import StoreIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import StyledBadge from '@mui/material/Badge';
import { Container } from '@mui/material';
import Logo from '../../server/public/white-logo.svg';
import Button from '@mui/material/Button';

const styles = {
  navBar: {
    paddingTop: 22
  },
  logoSize: {
    width: 170
  }
};

export default class NavBar extends React.Component {
  render() {
    return (
      <Container max-width='lg' style={styles.navBar}>
        <Grid container direction="row">
          <Grid item xs={7.5}>
            <Button aria-label='logo' href='#home'><img src={Logo} width={180} className='logo-img'/>
            </Button>
          </Grid>
          <Grid container direction='row' justifyContent='right' alignItems='center' item xs={4.5} className='icon-menu' >
            <IconButton aria-label='search' href='#search' style={this.props.style}><SearchIcon sx={{ color: 'white' }} /></IconButton>
            <IconButton aria-label="cart" href='#cart'>
              <StyledBadge badgeContent={this.props.qty} color="primary">
                <ShoppingBagIcon sx={{ color: 'white' }}/>
              </StyledBadge>
            </IconButton>
            <IconButton aria-label='shop' href='#products'><StoreIcon sx={{ color: 'white' }} /></IconButton>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
