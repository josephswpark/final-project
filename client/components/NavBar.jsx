import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import StoreIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import StyledBadge from '@mui/material/Badge';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Image from '../../server/public/home-image.jpeg';

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`
  }
};

export default class HelloWorld extends React.Component {
  render() {
    return (
      <Paper style={styles.paperContainer}>

        <Container maxWidth='lg'>
          <Grid container direction="row" justifyContent="right" alignItems='center'>
            <IconButton aria-label='search' href='#'><SearchIcon /></IconButton>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={4} color="primary">
                <ShoppingBagIcon />
              </StyledBadge>
            </IconButton>
            <IconButton aria-label='shop' href='#'><StoreIcon /></IconButton>
          </Grid>
        </Container>

      </Paper>
    );
  }
}
