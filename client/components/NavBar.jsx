import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import StoreIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import StyledBadge from '@mui/material/Badge';
import Logo from '../../server/public/white-logo.svg';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { FormControl, Input, InputAdornment, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  navBar: {
    paddingTop: 22
  },
  logoSize: {
    width: 170
  },
  xIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    cursor: 'pointer'
  }
};

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      products: [],
      filteredProductsList: [],
      isOpen: false
    };
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.searchModal = this.searchModal.bind(this);
  }

  componentDidMount() {
    fetch('/api/shoes')
      .then(res => res.json())
      .then(products => this.setState({ products, filteredProductsList: products }))
      .catch(err => console.error(err));
    const token = window.localStorage.getItem('token');
    if (token) {
      fetch('/api/cart', {
        method: 'GET',
        headers: {
          'X-Access-Token': token
        }
      })
        .then(res => res.json())
        .then(cart => this.setState({ cartItems: cart }))
        .catch(err => console.error(err));
    }
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  onSearchInputChange(event) {
    this.setState({ searchInput: event.target.value.toLowerCase() }, () => {
      if (this.state.searchInput === '') {
        this.setState({ filteredProductsList: this.state.products });
      }
    });
  }

  filterProducts(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      let filteredArr = this.state.products.filter(product => product.name.toLowerCase().includes(this.state.searchInput.toLowerCase()));
      if (this.state.searchInput === '') {
        filteredArr = this.state.products;
      }
      this.setState({ filteredProductsList: filteredArr });
    }
  }

  searchModal() {
    const productList = this.state.filteredProductsList;
    return (
      <Drawer
        {...this}
        anchor='right'
        open={this.state.isOpen}
        onClose={this.closeModal}
      >
        <Box style={{ width: '390px' }}>
          <span style={styles.xIcon}>
            <CloseIcon onClick={this.closeModal} className='xIcon' />
          </span>
          <Container style={{ marginLeft: '1rem', justifyContent: 'center' }}>
            <FormControl variant="standard" sx={{ m: 1, mt: 2, width: '300px' }} >
              <Input placeholder='Search our store'
                id="standard-adornment-weight"
                endAdornment={<InputAdornment position="end"><SearchIcon onClick={this.filterProducts} style={{ cursor: 'pointer' }} /></InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                  type: 'search'
                }}
                style={{ fontFamily: 'eczar' }}
                onChange={this.onSearchInputChange}
                onKeyDown={this.filterProducts}
              />
              <div style={{ lineHeight: '1rem' }}>
                <p style={{ fontWeight: 'bold' }}>Popular searches</p>
                <div style={{ marginTop: 0, paddingLeft: 0, display: 'flex' }}>
                  <p className='brands'>Jordan Nike Yeezy New Balance</p>
                </div>
              </div>
            </FormControl>
          </Container>
          <Grid style={{ marginTop: 0, marginLeft: '2rem' }}>
            <ImageList style={{ marginTop: 0, width: '335px' }} >
              {productList.map(item => (
                <a href={`#product?product=${item.productId}`} style={{ textDecoration: 'none', color: 'black', width: '150px' }} key={item.productId} >
                  <ImageListItem style={{ width: '150px' }}>
                    <img style={{ width: '150px', height: '150px' }}
                      src={item.imageUrl}
                      srcSet={item.imageUrl}
                      alt={item.title}
                    />
                  </ImageListItem>
                </a>
              ))}
            </ImageList>
          </Grid>

        </Box>
      </Drawer>
    );
  }

  render() {
    return (
      <>
        <Container max-width='lg' style={styles.navBar}>
          <Grid container direction="row">
            <Grid item xs={7.5}>
              <Button aria-label='logo' href='#home'><img src={Logo} width={180} className='logo-img' />
              </Button>
            </Grid>
            <Grid container direction='row' justifyContent='right' alignItems='center' item xs={4.5} className='icon-menu' >
              <IconButton aria-label='search' style={this.props.style} onClick={this.openModal} onClose={this.closeModal} className='x'>
                <SearchIcon sx={{ color: 'white' }} className='searchIcon'/>
              </IconButton>
              <IconButton aria-label="cart" href='#cart'>
                <StyledBadge badgeContent={this.props.qty} color="primary">
                  <ShoppingBagIcon sx={{ color: 'white' }} />
                </StyledBadge>
              </IconButton>
              <IconButton aria-label='shop' href='#products'><StoreIcon sx={{ color: 'white' }} /></IconButton>
            </Grid>
          </Grid>
        </Container >
        {this.searchModal()}
      </>
    );
  }
}
