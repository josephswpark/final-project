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
    backgroundImage: `url(${Image})`,
    borderRadius: 0
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
        <NavBar qty={this.state.cartItems.length} onClick={this.openModal} onClose={this.closeModal} />
        <a className="cta" href='#products'>
          <span className="hover-underline-animation"> Shop now </span>
          <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal" style={{ fill: 'white' }}>
            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10" />
          </svg>
        </a>
      </Paper>
    );
  }
}
