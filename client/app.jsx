import React from 'react';
import Home from './pages/home';
import Products from './pages/products';
import parseRoute from './lib/parse-route';
import ProductDetails from './pages/product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
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
  }

  render() {
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
