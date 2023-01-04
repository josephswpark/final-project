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
    height: '20vh',
    backgroundImage: `url(${Image})`
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
      size: null
    };
    this.sizes = this.sizes.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/shoes/${this.props.productId}`)
      .then(res => res.json())
      .then(product => this.setState({ product, loading: false }))
      .catch(err => console.error(err));
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ size: Number(value) });
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

    if (this.state.loading) return null;
    return (
      <>
        <Paper style={styles.paperContainer}>
          <NavBar />
        </Paper>

        <Container maxWidth='md' style={{ marginTop: '1rem' }}>
          <Grid container columns={{ xs: 4, sm: 8, md: 11 }}>
            <Grid item xs={5} >
              <Item style={{ padding: 0, justifyContent: 'center' }}><img style={{ width: 388, height: 390 }}
                  src={product.imageUrl}
                  srcSet={product.imageUrl}
                  alt={product.title}
                  loading="lazy"
                /></Item>
            </Grid>

            <Grid item xs={5} style={{ marginTop: 0, marginLeft: '1rem' }}>
              <span>
                <h3 style={{
                  fontFamily: 'eczar',
                  fontWeight: 300,
                  marginBottom: 0

                }}>{product.name}</h3>
                <h3 style={styles.spacing}>${product.price}</h3>
                <h3 style={styles.spacing}>size</h3>
              </span>
              <Stack direction='row'>
                {this.sizes()}
              </Stack>
              <Button theme={theme} color='primary' variant='contained'
              style={{ width: '330px', marginTop: '1.5rem' }} href=''>
                ADD TO CART
              </Button>
              <div>
                <ul>
                  <li><p>SKU: {product.sku}</p></li>
                  <li><p>100% Authencity Guaranteed</p></li>
                  <li><p>In stock & ready to ship!</p></li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </Container>
      </>
    )
    ;
  }
}
