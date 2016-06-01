import React from 'react';

import Product from './Product';

const ProductList = ({ loading, productsExist, products }) => {
  let content = [];
  if (loading) {
    content.push('Loading recommended products ...');
  } else if (!productsExist) {
    content.push('No recommended product matches found.');
  } else {
    products.forEach((product) => {
      content.push(<Product product={product} />);
    });
  }
  return (
    <div className="product-list">{content}</div>
  );
};

ProductList.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  productsExist: React.PropTypes.bool.isRequired,
  products: React.PropTypes.array.isRequired,
};

ProductList.defaultProps = {
  loading: true,
  productsExist: false,
  products: [],
};

export default ProductList;
