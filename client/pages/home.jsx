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
  render() {
    return (
      <Paper style={styles.paperContainer}>
        <NavBar qty={this.props.badgeContent}/>
      </Paper>
    );
  }
}
