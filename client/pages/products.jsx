import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import ListItemButton from '@mui/material/ListItemButton';
import Image from '../../server/public/shop-img.jpeg';
import Paper from '@mui/material/Paper';
import NavBar from '../components/NavBar';

const styles = {
  paperContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '50vh',
    backgroundImage: `url(${Image})`
  },
  shopAll: {
    textAlign: 'center',
    fontFamily: 'eczar',
    color: 'white',
    paddingTop: '7.5rem'
  },
  productStyle: {
    fontFamily: 'eczar',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'center'
  }
};

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    fetch('/api/shoes')
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(err => console.error(err));
  }

  render() {
    const productList = this.state.products;

    return (
      <>
        <Paper style={styles.paperContainer}>
          <NavBar />
          <h1 style={styles.shopAll}>Shop All Sneakers</h1>
        </Paper>

        <Container maxWidth='lg'>
          <ListItemButton ref={`#product?product=${productList.productId}`} >
            <ImageList style={{ gap: 20 }} sx={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important' }} >
              {productList.map(item => (
                <ImageListItem key={item.img} style={styles.allProduct} >
                  <img style={{ cursor: 'pointer' }}
                  src={item.imageUrl}
                  srcSet={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                />
                  <ImageListItemBar style={styles.productStyle}
                  title={item.name}
                  subtitle={<h3>${item.price}</h3>}
                  position="below"
                />
                </ImageListItem>
              ))}
            </ImageList>
          </ListItemButton>
        </Container>
      </>
    );
  }
}
