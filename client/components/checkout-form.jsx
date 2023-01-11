import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import NavBar from './NavBar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Total from '../lib/total';
import ImageList from '@mui/material/ImageList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Cart from '../pages/cart';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// import { ElementsConsumer } from '@stripe/react-stripe-js';

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
    height: '90px',
    backgroundColor: '#223644',
    borderRadius: 0
  },
  font: {
    fontFamily: 'eczar'
  },
  deleteButton: {
    fontSize: '0.8rem',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};

// export default function InjectedCheckoutForm() {
//   return (
//     <ElementsConsumer>
//       {({ stripe, elements }) => (
//         <Checkout stripe={stripe} elements={elements} />
//       )}
//     </ElementsConsumer>
//   );
// }

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout: 'contactInfo',
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      costs: {},
      cartItems: []
    };
    this.orderSummary = this.orderSummary.bind(this);
    this.cart = this.cart.bind(this);
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

  Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center" style={{ paddingBottom: '1rem', paddingTop: '1rem' }}>
        {'Copyright © '}
        <Link color="inherit" href="#home">
          SneakerWorld
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    );
  }

  orderSummary(props) {
    const total = Total(this.state.cartItems);
    return (
      <Container maxWidth='xs' style={{ marginTop: '2.5rem' }} >
        <Typography gutterBottom variant='h5' style={{ fontFamily: 'eczar', marginBottom: 0 }} >
          Summary
        </Typography>
        {this.cart()}
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }} >
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
      </Container>
    );
  }

  cart() {
    const shoe = this.state.cartItems;
    return (
      <Grid item style={{ padding: 0, maxWidth: '550px' }}>
        {shoe.map((item, index) => (
          <ImageList style={{ marginTop: 0, marginBottom: 0 }} key={index}>
            <img alt="complex" src={item.imageUrl} style={{ width: '125px', height: '125px' }} />
            <Grid item xs={12} container>
              <Grid item container direction="column" spacing={2} >
                <Grid item xs style={{ paddingTop: '1.6rem', paddingLeft: 0 }}>
                  <Typography style={{ fontFamily: 'eczar', paddingRight: '0.4rem' }} gutterBottom variant="subtitle1" component="div">
                    {item.name}
                  </Typography>
                  <Typography style={styles.font} variant="body1" gutterBottom>
                    ${item.price}
                  </Typography>
                  <Typography style={styles.font} variant="body2" color="text.secondary">
                    Size: {item.size}
                  </Typography>
                  <a key={item.itemId} aria-label="trash" onClick={this.delete} data-id={item.itemId} style={styles.deleteButton}>
                    Remove
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </ImageList>
        ))}
      </Grid>
    );
  }

  render() {
    const shoe = this.state.cartItems;
    if (!shoe.length) {
      return <Cart />;
    } else {
      return (
        <>
          <Paper style={styles.paperContainer}>
            <NavBar qty={shoe.length} />
          </Paper>
          <ThemeProvider theme={theme}>
            <Container>
              <Typography component="h1" variant="h4" align="center" style={{ fontFamily: 'eczar', marginTop: '2.5rem' }}>
                Checkout
              </Typography>
            </Container>
            <Container maxWidth='lg'>
              <Grid container>
                <Steps />
                {this.orderSummary()}
              </Grid>
            </Container>
          </ThemeProvider>
          {this.Copyright()}
        </>
      );
    }
  }
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return (
//         <>
//           <Typography variant="h6" gutterBottom >
//             Shipping address
//           </Typography>
//           <form>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   id="email"
//                   name="email"
//                   helperText="Email"
//                   placeholder='Email'
//                   autoComplete="email"
//                   variant="standard"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   id="firstName"
//                   name="firstName"
//                   helperText="First name"
//                   placeholder='First name'
//                   autoComplete="given-name"
//                   variant="standard"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   id="lastName"
//                   name="lastName"
//                   helperText="Last name"
//                   placeholder='Last name'
//                   fullWidth
//                   autoComplete="family-name"
//                   variant="standard"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   id="address1"
//                   name="address1"
//                   helperText="Address 1"
//                   placeholder='Address line 1'
//                   fullWidth
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   id="address2"
//                   name="address2"
//                   helperText="Address line 2"
//                   placeholder='Address line 2'
//                   fullWidth
//                   autoComplete="shipping address-line2"
//                   variant="standard"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   id="city"
//                   name="city"
//                   helperText="City"
//                   placeholder='City'
//                   fullWidth
//                   autoComplete="shipping address-level2"
//                   variant="standard"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   id="state"
//                   name="state"
//                   helperText="State/Province/Region"
//                   placeholder='State/Province/Region'
//                   fullWidth
//                   variant="standard"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   id="zip"
//                   name="zip"
//                   helperText="Zip / Postal code"
//                   placeholder='Zip / Postal code'
//                   fullWidth
//                   autoComplete="shipping postal-code"
//                   variant="standard"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   id="country"
//                   placeholder="Country"
//                   helperText='Country'
//                   fullWidth
//                   autoComplete="shipping country"
//                   variant="standard"
//                 />
//               </Grid>
//             </Grid>
//           </form>
//         </>
//       );
//     // case 1:
//     //   return <PaymentForm />;
//     // case 2:
//     //   return <OrderSummary />;
//     // default:
//     //   throw new Error('Unknown step');
//   }
// }

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 0
    };
  }

  render() {
    return (
      <Container component="main" maxWidth="sm" sx={{}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Stepper sx={{ pt: 3, pb: 5 }} style={{ maxWidth: '550px' }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {this.state.currentState === steps.length
            ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
              )
            : (
              <>
                {/* {getStepContent(activeStep)} */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                  <Button variant="contained" sx={{ mt: 3, ml: 1 }}>
                    {this.state.currentState === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>

              </>
              )}
        </Paper>
      </Container>

    );
  }
}
