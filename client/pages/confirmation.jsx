import React from 'react';
import Paper from '@mui/material/Paper';
import NavBar from '../components/NavBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';

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
  }
};

export default class Confirmation extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.orderSummary = this.orderSummary.bind(this);
  // }

  // orderSummary(props) {
  //   const address = this.state.address;
  //   console.log(this.state);
  //   return (
  //     <Container maxWidth='xs' style={{ marginTop: '2.5rem' }} >
  //       <Typography gutterBottom variant='h6' style={{ fontFamily: 'eczar', marginBottom: 0 }}>
  //         Details:
  //       </Typography>
  //       <Divider variant='fullWidth' style={{ marginTop: '0.5rem', marginBottom: '1rem' }} />
  //       <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }} >
  //         <div style={{ justifyContent: 'space-between' }} >
  //           <Typography style={{ fontFamily: 'eczar', fontWeight: 'bold' }} variant="subtitle1" gutterBottom >
  //             Shipping
  //           </Typography>
  //           <Typography style={styles.font} variant="body1">
  //             {address.firstName} {address.lastName} <br/>
  //             {address.address} {address.address2} <br/>
  //             {address.city} {address.state}, {address.zipCode}
  //           </Typography>
  //         </div>
  //       </Grid>
  //       <Divider variant='fullWidth' style={{ marginTop: '1rem', marginBottom: '1rem' }} />
  //       <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
  //         <Typography style={{ fontFamily: 'eczar', marginRight: '0.5rem', fontWeight: 'bold' }} variant="subtitle1" guterrBottom>
  //           Total:
  //         </Typography>
  //         <Typography style={styles.font}>${this.state.address.totalCost}</Typography>
  //       </div>
  //       <Divider variant='fullWidth' style={{ marginTop: '0.5rem' }} />
  //       <Grid item xs={12}>
  //         <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
  //           <Button variant="contained" sx={{ mt: 3, ml: 1 }} type='click' style={{ fontFamily: 'eczar' }} href='#home'>
  //             CONTINUE SHOPPING!
  //           </Button>
  //         </div>
  //       </Grid>
  //     </Container>
  //   );
  // }

  render() {
    // const cartInfo = this.state.address;
    // if (this.state.loading) return null;
    return (
      <>
        <Paper style={styles.paperContainer}>
          <NavBar style={{ display: 'none' }} />
        </Paper>
        <Container maxWidth='sm'>
          <ThemeProvider theme={theme}>
            <Container>
              <Typography component="h1" variant="h5" align="center" style={{ fontFamily: 'eczar', marginTop: '2.5rem' }}>
                Thank you for your order!<CheckCircleIcon style={{ marginLeft: '0.5rem', color: '#008000', marginBottom: '-0.2rem' }} />
              </Typography>
              <Typography variant="subtitle1" align="center" style={{ fontFamily: 'eczar' }}>
                Your order is confirmed and headed your way!
              </Typography>
            </Container>
            <Container maxWidth='lg'>
              <Grid container>
                <Divider variant='fullWidth' style={{ marginTop: '0.5rem' }} />
                <Grid item xs={12}>
                  <div style={{ display: 'flex', justifyContent: 'center' }} >
                    <Button variant="contained" sx={{ mt: 3, ml: 1 }} type='click' style={{ fontFamily: 'eczar' }} href='#home'>
                      CONTINUE SHOPPING!
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </ThemeProvider>
        </Container>
      </>
    );
  }
}
