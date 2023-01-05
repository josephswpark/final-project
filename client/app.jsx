import React from 'react';
import Home from './pages/home';
import Products from './pages/products';
import parseRoute from './lib/parse-route';
import ProductDetails from './pages/product-details';
import jwtDecode from 'jwt-decode';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      cart: null,
      isOpen: false
    };
    this.renderPage = this.renderPage.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });

    const token = window.localStorage.getItem('token');
    const tokenStored = token ? jwtDecode(token) : null;
    this.setState({ cart: tokenStored });
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
    window.location.search = '';
  }

  renderPage() {
    const { route } = this.state;
    const { path } = route;
    if (path === 'home' || path === '') {
      return (
        <Home />
      );
    }
    if (path === 'products') {
      return <Products />;
    }
    if (path === 'product') {
      const productId = route.params.get('product');
      return <ProductDetails productId={productId}/>;
    }
    // if (path === 'cart') {
    //   const cartId = this.state.cart
    //     ? this.state.cart.cartId
    //     : null;
    //   return <Cart cartId={cartId} />;
    // }
  }

  render() {
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
