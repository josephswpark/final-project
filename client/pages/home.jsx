import React from 'react';
import NavBar from '../components/NavBar';
import Paper from '@mui/material/Paper';
import Image from '../../server/public/home-image.jpeg';

const styles = {
  paperContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    backgroundImage: `url(${Image})`
  }
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
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

  render() {
    return (
      <Paper style={styles.paperContainer}>
        <NavBar qty={this.state.cartItems.length}/>
      </Paper>
    );
  }
}
