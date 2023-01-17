import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import Image from '../../server/public/shop-img.jpeg';
import Paper from '@mui/material/Paper';
import NavBar from '../components/NavBar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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
    height: '300px',
    backgroundImage: `url(${Image})`,
    borderRadius: 0
  },
  shopAll: {
    textAlign: 'center',
    fontFamily: 'eczar',
    color: 'white',
    paddingTop: '2.5rem'
  },
  productStyle: {
    fontFamily: 'eczar',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'center'
  },
  font: {
    fontFamily: 'eczar',
    fontStyle: 'italic'
  },
  xIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    cursor: 'pointer'
  }
};

function Breadcrumb() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="#home" style={styles.font}>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="text.primary"
      href="#products"
      style={styles.font}
    >
      Products
    </Link>
  ];

  return (
    <Stack spacing={2} style={{ marginTop: '0.4rem' }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cartItems: [],
      filteredProductsList: [],
      searchInput: '',
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
    // let filteredArr = [];

    // switch (filterType) {
    //   case 'brand':
    //     filteredArr = this.state.products.filter(product => product.brand === this.state.brand);
    //     break;
    //   default:
    //     break;
    // }

    // this.setState({ filteredProductsList: filteredArr });

    if (event.key === 'Enter' || event.type === 'click') {
      let filteredArr = this.state.products.filter(product => product.name.toLowerCase().includes(this.state.searchInput.toLowerCase()));
      if (this.state.searchInput === '') {
        filteredArr = this.state.products;
      }
      this.setState({ filteredProductsList: filteredArr });
      this.closeModal();
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
    const unfillteredList = this.state.products;
    const shoe = this.state.cartItems;
    return (
      <>
        <Paper style={styles.paperContainer}>
          <NavBar qty={shoe.length} onClick={this.openModal} onClose={this.closeModal}/>
          <h1 style={styles.shopAll}>Shop All Sneakers</h1>
        </Paper>

        <Container maxWidth='lg'>
          <Grid item xs={12} style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <Breadcrumb />
          </Grid>
          <ImageList style={{ gap: 11, marginTop: 0 }} sx={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important' }} >
            {unfillteredList.map(item => (
              <a href={`#product?product=${item.productId}`} style={{ textDecoration: 'none', color: 'black' }} key={item.productId} >
                <ImageListItem style={{ alignItems: 'center' }}>
                  <img style={{ cursor: 'pointer', width: '300px' }}
                  src={item.imageUrl}
                  srcSet={item.imageUrl}
                  alt={item.title}
                />
                  <ImageListItemBar style={styles.productStyle}
                  title={item.name}
                  subtitle={<h3>${item.price}</h3>}
                  position="below"
                />
                </ImageListItem>
              </a>
            ))}
          </ImageList>
        </Container>
        {this.searchModal()}
      </>
    );
  }
}
