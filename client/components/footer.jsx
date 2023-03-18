import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import 'aos/dist/aos.css';

export default function Footer() {
  return (
    <Box component='footer' sx={{
      py: 0.1,
      px: 2,
      backgroundColor: 'black'
    }}>
      <Container maxWidth='lg' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid xs={6} style={{ marginTop: '2.5rem' }}>
          <a className='footer-logo'>
            SNEAKER WORLD
          </a><br/>
          <div style={{ paddingTop: '0.5rem' }}>
            <a href="" ><InstagramIcon className='logo-button' /></a>
            <a href="" style={{ marginLeft: '0.3rem' }}><TwitterIcon className='logo-button'/></a>
            <a href="" style={{ marginLeft: '0.3rem' }}><FacebookIcon className='logo-button'/></a>
            <a href='https://github.com/josephswpark' style={{ marginLeft: '0.3rem' }}><GitHubIcon className='logo-button'/></a>
          </div>
        </Grid>
        <Grid xs={6}>
          <ul className='footer-list'>
            <li style={{ marginBottom: '1rem' }}><a href='#products' className='footer'>Shop</a></li>
            <li style={{ marginBottom: '1rem' }}><a href='#' className='footer'>About</a></li>
            <li style={{ marginBottom: '1rem' }}><a href='#' className='footer'>Contact</a></li>
            <li><a href='#shipping-info' className='footer'>Shipping & Returns</a></li>
          </ul>

        </Grid>
      </Container>
      <Container maxWidth="sm">
        <p style={{ paddingBottom: 0, paddingTop: '2rem', color: 'white', textAlign: 'center' }}
        >
          {'Copyright © '}
          <Link color="inherit" href="#home">
            Sneaker World
          </Link>{' '}
          {new Date().getFullYear()}.
        </p>
      </Container>
    </Box>
  );
}
