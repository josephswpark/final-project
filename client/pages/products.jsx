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
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import IconButton from '@mui/material/IconButton';

const styles = {
  paperContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '300px',
    backgroundImage: `url(${Image})`
  },
  shopAll: {
    textAlign: 'center',
    fontFamily: 'eczar',
    color: 'white',
    paddingTop: '2rem'
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
  }
};

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cartItems: []
    };
  }

  componentDidMount() {
    fetch('/api/shoes')
      .then(res => res.json())
      .then(products => this.setState({ products }))
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

  render() {
    const productList = this.state.products;
    const shoe = this.state.cartItems;
    return (
      <>
        <Paper style={styles.paperContainer}>
          <NavBar qty={shoe.length} open={this.openModal} />
          <h1 style={styles.shopAll}>Shop All Sneakers</h1>
        </Paper>
        <Container maxWidth='lg'>
          <Grid item xs={12} style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <CustomSeparator/>
            <IconButton >
              <TuneOutlinedIcon/>
            </IconButton>
          </Grid>
          <ImageList style={{ gap: 20, marginTop: 0 }} sx={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important' }} >
            {productList.map(item => (
              <a href={`#product?product=${item.productId}`} style={{ textDecoration: 'none', color: 'black' }} key={item.productId} >
                <ImageListItem>
                  <img style={{ cursor: 'pointer' }}
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
      </>
    );
  }
}

function CustomSeparator() {
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
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
