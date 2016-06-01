import React from 'react';

import ExpertMessage from '../components/products/ExpertMessage';
import Promotion from '../components/products/Promotion';
import ProductControls from '../components/products/ProductControls';
import ProductList from '../components/products/ProductList';
import Footer from '../components/footer/Footer';

const ProductsPage = ({ loading, productsExist, products, productTotals }) => (
  <div className="products-page">
    <ExpertMessage />
    <ProductControls productTotals={productTotals} />
    <Promotion />
    {/*<ProductList
      loading={loading} productsExist={productsExist} products={products}
    />*/}
    <ProductControls productTotals={productTotals} />
    <Footer />
  </div>
);

ProductsPage.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  productsExist: React.PropTypes.bool.isRequired,
  products: React.PropTypes.array.isRequired,
  productTotals: React.PropTypes.object,
};

ProductsPage.defaultProps = {
  loading: true,
  productsExist: false,
  products: [],
};

export default ProductsPage;
