import React from 'react';
import NavBar from '../components/NavBar';
import Paper from '@mui/material/Paper';
import Image from '../../server/public/product-detail-img.jpeg';
import Container from '@mui/material/Container';
import Item from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import CartModal from '../components/cart-modal';
import jwtDecode from 'jwt-decode';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#223644'
    }
  }
});

const styles = {
  paperContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '30vh',
    backgroundImage: `url(${Image})`,
    borderRadius: 0

  },
  infoStyle: {
    fontFamily: 'eczar',
    fontWeight: 300
  },
  spacing: {
    marginTop: 0,
    height: '22px',
    fontFamily: 'eczar',
    fontWeight: 300
  }

};

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      loading: true,
      size: null,
      isOpen: false,
      quantity: 1,
      cart: null,
      cartItems: []
    };
    this.sizes = this.sizes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    fetch(`/api/shoes/${this.props.productId}`)
      .then(res => res.json())
      .then(product => this.setState({ product, loading: false }))
      .catch(err => console.error(err));
    const token = window.localStorage.getItem('token');
    const tokenStored = token ? jwtDecode(token) : null;
    this.setState({ cart: tokenStored });
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

  handleChange(event) {
    const { value } = event.target;
    this.setState({ size: Number(value) });
  }

  addToCart(event) {
    event.preventDefault();
    if (this.state.size === null) {
      alert('Please choose a size!');
    } else {
      const cartItem = {
        productId: this.props.productId,
        quantity: this.state.quantity,
        size: this.state.size
      };
      const token = window.localStorage.getItem('token');
      if (this.state.cart) {
        fetch('/api/addToCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': token
          },
          body: JSON.stringify(cartItem)
        })
          .then(res => res.json())
          .then(res => {
            this.openModal();
          })
          .catch(err => console.error(err));
      } else if (!this.state.cart) {
        fetch('/api/addToCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cartItem)
        })
          .then(res => res.json())
          .then(res => {
            window.localStorage.setItem('token', res.token);
            this.openModal();
          })
          .catch(err => console.error(err));
      }
    }
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  sizes() {
    const sizes = this.state.product.sizes;
    const sizeInputs = sizes.map(size => {
      return (
        <label key={size}>
          <input className="size-input" type="radio" value={size} id={size}
          name="sizes" onChange={this.handleChange} />
          <span className='size'>{size}</span>
        </label>
      );
    });
    return sizeInputs;
  }

  render() {
    const product = this.state.product;
    const shoe = this.state.cartItems;
    if (this.state.loading) return null;
    return (
      <>
        <Paper style={styles.paperContainer}>
          <NavBar qty={shoe.length} open={this.openModal}/>
        </Paper>
        <Container maxWidth='md' style={{ marginTop: '1rem' }}>
          <Grid item xs={12} style={{ marginTop: '1.5rem', fontFamily: 'eczar', fontStyle: 'italic' }}>
            <CustomSeparator />
          </Grid>
          <Grid container columns={{ xs: 4, sm: 8, md: 11 }}>
            <Grid item xs={5} >
              <Item style={{ padding: 0, justifyContent: 'center' }}><img style={{ width: 388, height: 390 }}
                  src={product.imageUrl}
                  srcSet={product.imageUrl}
                  alt={product.title}
                  loading="lazy"
                /></Item>
            </Grid>
            <form onSubmit={this.addToCart}>
              <Grid item xs={5} style={{ marginTop: 0, marginLeft: '1rem' }}>
                <span>
                  <h3 style={{
                    fontFamily: 'eczar',
                    fontWeight: 300,
                    marginBottom: 0,
                    width: '345px'
                  }}>{product.name}</h3>
                  <h3 style={styles.spacing}>${product.price}</h3>
                  <h3 style={styles.spacing}>size</h3>
                </span>
                <Stack direction='row'>
                  {this.sizes()}
                </Stack>
                <Button type='submit' theme={theme} color='primary' variant='contained'
                  style={{ width: '330px', marginTop: '1.5rem', fontFamily: 'ezcar' }}>
                  ADD TO CART
                </Button>
                <div style={{ marginBottom: '3rem' }}>
                  <ul style={{ width: '345px' }}>
                    <li key='sku'><p>SKU: {product.sku}</p></li>
                    <li key='authentic'><p>100% Authencity Guaranteed</p></li>
                    <li key='ready'><p>In stock & ready to ship!</p></li>
                  </ul>
                </div>
              </Grid>
            </form>
          </Grid>
        </Container>
        <CartModal qty={this.state.quantity} productinfo={this.state.product}
        size={this.state.size} open={this.state.isOpen} onClose={this.closeModal} />
      </>
    )
    ;
  }
}

function CustomSeparator() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="#home" style={{ fontFamily: 'eczar' }}>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="#products"
      style={{ fontFamily: 'eczar' }}
    >
      Products
    </Link>,
    <Link
      underline="hover"
      key="3"
      color="text.primary"
      style={{ fontFamily: 'eczar', cursor: 'pointer' }}
    >
      Product Details
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
