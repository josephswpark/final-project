import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';
import Image from '../../server/public/shop-img.jpeg';
import Paper from '@mui/material/Paper';
import NavBar from '../components/NavBar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const styles = {
  paperContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '300px',
    backgroundImage: `url(${Image})`,
    borderRadius: 0
  },
  shopAll: {
    textAlign: 'center',
    fontFamily: 'eczar',
    color: 'white',
    paddingTop: '2.5rem'
  },
  productStyle: {
    fontFamily: 'eczar',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'center',
    flexWrap: 'wrap',
    height: '100%',
    padding: '0 1rem',
    lineHeight: '1.2rem'
  },
  font: {
    fontFamily: 'eczar',
    fontStyle: 'italic'
  },
  xIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    cursor: 'pointer'
  },
  summaryPaper: {
    p: 2,
    marginTop: '1rem',
    maxWidth: 390,
    flexGrow: 1,
    backgroundColor: theme =>
      theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
  }
};

function Breadcrumb() {
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
    <Stack spacing={2} style={{ marginTop: '0.4rem' }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cartItems: [],
      filteredProductsList: [],
      isOpen: false
    };
    this.filterModal = this.filterModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
  }

  componentDidMount() {
    fetch('/api/shoes')
      .then(res => res.json())
      .then(products => this.setState({ products, filteredProductsList: products }))
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

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  filterProducts(event) {
    if (event.target.value === 'Nike' || event.target.value === 'Yeezy' || event.target.value === 'New Balance' || event.target.value === 'Jordan') {
      const filteredArr = this.state.products.filter(product => product.brand.includes(event.target.value));
      this.setState({ filteredProductsList: filteredArr });
      this.closeModal();
      if (event.target.value === 'reset') {
        this.setState({ filteredProductsList: this.state.products });
      }
    }
    if (event.target.value === 'A-Z') {
      const alphabet = this.state.products.sort(function (a, b) { return a.name.localeCompare(b.name); }).filter(product => product);
      this.setState({ filteredProductsList: alphabet });
      this.closeModal();
    }
    if (event.target.value === 'high to low') {
      const priceHighToLow = this.state.products.sort(function (a, b) { return b.price - a.price; });
      this.setState({ filteredProductsList: priceHighToLow });
      this.closeModal();
    }
    if (event.target.value === 'low to high') {
      const priceHighToLow = this.state.products.sort(function (a, b) { return a.price - b.price; });
      this.setState({ filteredProductsList: priceHighToLow });
      this.closeModal();
    }
    if (event.target.classList.contains('reset')) {
      this.setState({ filteredProductsList: this.state.products });
      this.closeModal();
    }
  }

  filterModal() {
    return (
      <Popover
        {...this}
        anchor='right'
        open={this.state.isOpen}
        onClose={this.closeModal}
        PaperProps={{ style: { height: '50%', backgroundColor: '#223644' } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Box style={{ width: '360px' }}>
          <span style={styles.xIcon}>
            <CloseIcon onClick={this.closeModal} className='xIcon' style={{ color: 'white' }}/>
          </span>
          <p style={{ marginLeft: '2rem', color: 'white', marginBottom: '0.5rem' }}>Filters</p>
          <Grid container style={{ justifyContent: 'center' }}>
            <Accordion style={{ width: '300px', marginBottom: '0.5rem' }}>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ margin: 0 }}
                >
                <Typography style={{ fontFamily: 'eczar' }}>Sort by</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RadioGroup aria-label="sort by" name="sort-by" >
                  <FormControlLabel style={{ border: 'none' }} value="A-Z" control={<Radio />}
                  label={<Typography variant='subtitle1' style={{ fontFamily: 'eczar' }}>Alphabetically, A-Z</Typography>}
                  onClick={this.filterProducts} />
                  <FormControlLabel style={{ border: 'none' }} value="low to high" control={<Radio />}
                    label={<Typography variant='subtitle1' style={{ fontFamily: 'eczar' }}>Price, Low to High</Typography>}
                  onClick={this.filterProducts} />
                  <FormControlLabel style={{ border: 'none' }} value="high to low" control={<Radio />}
                    label={<Typography variant='subtitle1' style={{ fontFamily: 'eczar' }}>Price, High to Low</Typography>}
                  onClick={this.filterProducts} />
                </RadioGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ width: '300px', marginBottom: '0.5rem' }}>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                <Typography style={{ fontFamily: 'eczar' }}>Brand type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RadioGroup aria-label="brand" name="brand" >
                  <FormControlLabel style={{ border: 'none', fontFamily: 'eczar' }} value="Nike" control={<Radio />}
                  label={<Typography variant='subtitle1' style={{ fontFamily: 'eczar' }}>Nike</Typography>} onClick={this.filterProducts}/>
                  <FormControlLabel style={{ border: 'none' }} value="Yeezy" control={<Radio />}
                  label={<Typography variant='subtitle1' style={{ fontFamily: 'eczar' }}>Yeezy</Typography>} onClick={this.filterProducts} />
                  <FormControlLabel style={{ border: 'none' }} value="New Balance" control={<Radio />}
                    label={<Typography variant='subtitle1' style={{ fontFamily: 'eczar' }}>New Balance</Typography>}
                  onClick={this.filterProducts} />
                  <FormControlLabel style={{ border: 'none' }} value="Jordan" control={<Radio />}
                  label={<Typography variant='subtitle1' style={{ fontFamily: 'eczar' }}>Jordan</Typography>} onClick={this.filterProducts} />
                </RadioGroup>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <a className='reset' style={{ color: 'white', marginLeft: '2rem', cursor: 'pointer', textDecoration: 'underline' }} onClick={this.filterProducts}>Reset</a>
        </Box>
      </Popover>
    );
  }

  render() {
    const unfillteredList = this.state.filteredProductsList;
    const shoe = this.state.cartItems;
    return (
      <>
        <Paper style={styles.paperContainer}>
          <NavBar qty={shoe.length} />
          <h1 style={styles.shopAll}>Shop All Sneakers</h1>
        </Paper>

        <Container maxWidth='lg'>
          <Grid item xs={12} style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <Breadcrumb />
            <TuneIcon style={{ cursor: 'pointer' }} onClick={this.openModal} />

          </Grid>
          <ImageList style={{ gap: 11, marginTop: '1rem' }} sx={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))!important' }} >
            {unfillteredList.map((item, index) => (
              <Paper key={index} elevation={3}>
                <a href={`#product?product=${item.productId}`} style={{ textDecoration: 'none', color: 'black' }} key={item.productId} >
                  <ImageListItem style={{ alignItems: 'center' }}>
                    <img style={{ cursor: 'pointer', width: '250px' }}
                  src={item.imageUrl}
                  srcSet={item.imageUrl}
                  alt={item.title}
                      loading="lazy"
                />
                    <div style={styles.productStyle}>
                      <p style={{ marginTop: 0 }}>{item.name} </p>
                      <p style={{ marginTop: 0, fontWeight: 'bold' }}>${item.price}</p>
                    </div>
                  </ImageListItem>
                </a>
              </Paper>
            ))}
          </ImageList>
        </Container>
        {this.filterModal()}
      </>
    );
  }
}
