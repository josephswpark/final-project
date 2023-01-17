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
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

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
      searchInput: '',
      isOpen: false
    };
    this.filterModal = this.filterModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    fetch('/api/shoes')
      .then(res => res.json())
      .then(products => this.setState({ products }))
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

  filterModal() {
    return (
      <>
        <TuneIcon style={{ cursor: 'pointer' }} onClick={this.openModal}/>
        <Popover
        {...this}
        anchor='right'
        open={this.state.isOpen}
        // open
        onClose={this.closeModal}
        PaperProps={{ style: { height: '50%' } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
          <Box style={{ width: '390px' }}>
            <span style={styles.xIcon}>
              <CloseIcon onClick={this.closeModal} className='xIcon' />
            </span>
            <Container style={{ justifyContent: 'center' }}>
              {/* <Accordion style={{ width: '250px' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ fontFamily: 'eczar' }}>Sort by</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ width: '250px' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography style={{ fontFamily: 'eczar' }}>Brand type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion> */}
            </Container>
          </Box>
        </Popover>
      </>
    );
  }

  render() {
    const unfillteredList = this.state.products;
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
            {this.filterModal()}
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
      </>
    );
  }
}
