import React from 'react';

const ProductsPage = () => (
  <div className="products-page">Products</div>
);

ProductsPage.propTypes = {
  customerSession: React.PropTypes.object.isRequired,
};

export default ProductsPage;
