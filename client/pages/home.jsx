import React from 'react';
import NavBar from '../components/NavBar';
import Paper from '@mui/material/Paper';
import Image from '../../server/public/home-image.jpeg';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { FormControl, Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  paperContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    backgroundImage: `url(${Image})`,
    borderRadius: 0
  },
  xIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    cursor: 'pointer'
  }
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      products: [],
      filteredProductsList: []
    };
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
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
    fetch('/api/shoes')
      .then(res => res.json())
      .then(products => this.setState({ products, filteredProductsList: products }))
      .catch(err => console.error(err));
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
      this.closeModal();
    }
  }

  render() {
    const productList = this.state.filteredProductsList;
    return (
      <>
        <Paper style={styles.paperContainer}>
          <NavBar qty={this.state.cartItems.length} onClick={this.openModal} onClose={this.closeModal} />
        </Paper>
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
                  endAdornment={<InputAdornment position="end"><SearchIcon onClick={this.filterProducts} style={{ cursor: 'pointer' }}/></InputAdornment>}
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
      </>
    );
  }
}
