import React from 'react';
import NavBar from '../components/NavBar';
import Paper from '@mui/material/Paper';
import Image from '../../server/public/check-out-img.jpeg';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import List from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Total from '../lib/total';
import { createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import TrashIcon from '@mui/icons-material/DeleteOutlined';

const theme = createTheme({
  palette: {
    primary: {
      main: '#223644'
    },
    secondary: {
      main: '#C4B7A6'
    }
  }

});
const styles = {
  paperContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '30vh',
    backgroundImage: `url(${Image})`
  },
  cartItem: {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper'
  },
  img: {
    width: '250px',
    height: '250px'
  },
  font: {
    fontFamily: 'eczar'
  },
  summaryPaper: {
    p: 2,
    marginTop: '1rem',
    maxWidth: 390,
    flexGrow: 1,
    height: '325px',
    backgroundColor: theme =>
      theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
  },
  cartPaper: {
    marginBottom: '2rem',
    marginTop: '1rem',
    p: 2,
    maxWidth: 550,
    flexGrow: 1,
    height: '240px',
    boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.15)',
    backgroundColor: theme =>
      theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
  }
};

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
    this.orderSummary = this.orderSummary.bind(this);
    this.delete = this.delete.bind(this);
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
  }

  delete(event) {
    const itemId = event.target.dataset.id;
    const token = window.localStorage.getItem('token');
    fetch(`/api/cartItems/${itemId}`, {
      method: 'DELETE',
      headers: { 'X-Access-Token': token }
    })
      .then(res => res.json())
      .then(cart => this.setState({ cartItems: cart }))
      .catch(err => console.error(err));
  }

  orderSummary(props) {
    const total = Total(this.state.cartItems);
    return (

      <>
        <Typography gutterBottom variant='h5' style={{ fontFamily: 'eczar', marginBottom: '1rem' }} theme={theme} color='secondary' >
          Summary
        </Typography>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '390px' }} >
          <Typography gutterBottom variant="subtitle1" style={styles.font}>
            Subtotal
          </Typography>
          <Typography style={styles.font}>${total.subtotal}</Typography>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
          <Typography style={styles.font} variant="subtitle1" gutterBottom>
            Shipping
          </Typography>
          <Typography style={styles.font}>Free</Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
          <Typography style={styles.font} variant="subtitle1" guterrBottom>
            Estimated Tax
          </Typography>
          <Typography style={styles.font}>${total.tax}</Typography>
        </div>
        <Divider variant='fullWidth' style={{ marginTop: '1rem', marginBottom: '1rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
          <Typography style={styles.font} variant="subtitle1" guterrBottom>
            Total
          </Typography>
          <Typography style={styles.font}>${total.total}</Typography>
        </div>
        <Divider variant='fullWidth' style={{ marginTop: '0.5rem' }} />
      </>

    );
  }

  render() {
    const shoe = this.state.cartItems;
    const total = Total(this.state.cartItems);

    if (!this.state.cartItems.length) {
      return (
        <>
          <Paper style={styles.paperContainer}>
            <NavBar/>
          </Paper>
          <Container maxWidth='lg'>
            <div style={{ display: 'flex' }}>
              <h3>Bag</h3>
              <p style={{ marginLeft: '0.65rem', marginTop: '1.3rem' }}>{this.state.cartItems.length} item(s)</p>
            </div>
            <Grid container spacing={2} direction='flex' justifyContent='space-evenly'>
              <Grid item style={{ width: '575px' }}>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs style={{ textAlign: 'center' }} >
                      <Typography style={{ fontFamily: 'eczar', textAlign: 'center' }} gutterBottom variant="subtitle1" component="div" >
                        Your cart is currently empty!
                      </Typography>
                      <Button href='#products' variant='contained' theme={theme} color='secondary' style={{ width: '205px', marginTop: '1rem', fontFamily: 'ezcar' }}>
                        SHOP FOR SHOES </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Paper style={styles.summaryPaper}>
                <Grid container>
                  <List style={{ paddingLeft: '2rem', paddingTop: '1rem' }}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2} >
                        <Grid item style={{ maxWidth: '340px' }}>
                          {this.orderSummary()}
                          <Button disabled variant='contained' theme={theme} color='primary' style={{ width: '320px', marginTop: '2rem', fontFamily: 'ezcar' }}>
                            GO TO CHECKOUT • ${total.total}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </List>
                </Grid>
              </Paper>
            </Grid>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <Paper style={styles.paperContainer}>
            <NavBar qty={shoe.length} />
          </Paper>

          <Container maxWidth='lg'>
            <div style={{ display: 'flex' }}>
              <h3>Bag</h3>
              <p style={{ marginLeft: '0.65rem', marginTop: '1.3rem' }}>{this.state.cartItems.length} item(s)</p>
            </div>
          </Container>
          <Container maxWidth='lg'>
            <Grid container style={{ marginLeft: '0.5rem' }}>
              <Grid container spacing={2} justifyContent='space-evenly'>
                <Grid item style={{ padding: 0, maxWidth: '550px' }}>
                  {shoe.map((item, index) => (
                    <Paper style={styles.cartPaper} key={index}>
                      <ImageList style={{ marginTop: '1rem', marginLeft: '0.5rem' }}>
                        <a href={`#product?product=${item.productId}`} style={{ textDecoration: 'none', color: 'black' }} key={item.productId} >
                          <img alt="complex" src={item.imageUrl} style={{ width: '240px', height: '240px' }}/>
                        </a>
                        <Grid item xs={12} container>
                          <Grid item container direction="column" spacing={2} >
                            <Grid item xs style={{ paddingTop: '2.5rem', paddingLeft: '1rem' }}>
                              <Typography style={{ fontFamily: 'eczar', paddingRight: '0.4rem' }} gutterBottom variant="subtitle1" component="div">
                                {item.name}
                              </Typography>
                              <Typography style={styles.font} variant="body1" gutterBottom>
                                ${item.price}
                              </Typography>
                              <Typography style={styles.font} variant="body2" color="text.secondary">
                                Size: {item.size}
                              </Typography>

                              <IconButton key={item.itemId} aria-label="trash" onClick={this.delete} data-id={item.itemId} data-size={item.size}>
                                <TrashIcon data-id={item.itemId} data-size={item.size}/>
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ImageList>
                    </Paper>
                  ))}
                </Grid>
                <Paper style={styles.summaryPaper}>
                  <Grid container>
                    <List style={{ paddingLeft: '2rem', paddingTop: '1rem' }}>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} >
                          <Grid item style={{ maxWidth: '340px' }}>
                            {this.orderSummary()}
                            <Button variant='contained' theme={theme} color='primary' style={{ width: '320px', marginTop: '2rem', fontFamily: 'ezcar' }}>
                              GO TO CHECKOUT • ${total.total}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </List>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      );
    }
  }
}
