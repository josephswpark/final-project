import React from 'react';
import Home from './pages/home';
import Products from './pages/products';
import parseRoute from './lib/parse-route';
import ProductDetails from './pages/product-details';
import jwtDecode from 'jwt-decode';
import Cart from '../client/pages/cart';
import Checkout from './pages/checkout';
import Confirmation from './pages/confirmation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      cart: null
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const searchParams = new URL(window.location).searchParams;
    if (searchParams.has('payment_intent')) {
      window.localStorage.removeItem('token');
    } else {
      const token = window.localStorage.getItem('token');
      const tokenStored = token ? jwtDecode(token) : null;
      this.setState({ cart: tokenStored });
    }

  }

  renderPage() {
    const { route } = this.state;
    const { path } = route;
    if (path === 'home' || path === '') {
      return <Home />;
    }
    if (path === 'products') {
      return <Products/>;
    }
    if (path === 'product') {
      const productId = route.params.get('product');
      return <ProductDetails productId={productId}/>;
    }
    if (path === 'cart') {
      const cartId = this.state.cart
        ? this.state.cart.cartId
        : null;
      return <Cart cartId={cartId} />;
    }
    if (path === 'checkout') {
      return <Checkout />;
    }
    if (path === 'confirmation') {
      return <Confirmation />;
    }
  }

  render() {
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
