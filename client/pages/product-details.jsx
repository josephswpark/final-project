import React from 'react';
import NavBar from '../components/NavBar';
import Paper from '@mui/material/Paper';
import Image from '../../server/public/product-detail-img.jpeg';
import Container from '@mui/material/Container';
import Item from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';

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
        <Item key={size} style={{ padding: '0.2rem' }}>
          <ToggleButton sx={{ width: '55px' }} >
            {size}
          </ToggleButton>
        </Item>
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
        <Container maxWidth='md' >
          <Grid container>
            <Grid item xs={6} >
              <Item><img style={{ width: 400, height: 400 }}
                  src={product.imageUrl}
                  srcSet={product.imageUrl}
                  alt={product.title}
                  loading="lazy"
                /></Item>
            </Grid>
            <Grid item xs={5} style={{ marginTop: '5rem' }}>
              <span>
                <h3 style={{
                  fontFamily: 'eczar',
                  fontWeight: 300,
                  marginBottom: 0
                }}>{product.name}</h3>
                <h3 style={styles.spacing}>${product.price}</h3>
                <h3 style={styles.spacing}>size</h3>
              </span>

              <ToggleButtonGroup exclusive onChange={this.handleChange} singleClick>
                {this.sizes()}
              </ToggleButtonGroup>
              <Button theme={theme} color='primary' variant='contained' style={{ width: '330px', marginTop: '3rem' }} href=''>ADD TO CART</Button>
            </Grid>
          </Grid>
        </Container>
      </>
    )
    ;
  }
}
