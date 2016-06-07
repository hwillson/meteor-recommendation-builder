import React from 'react';

import Product from '../product/Product';

const CartProducts = ({ loading, cartProducts }) => {
  let content = [];
  if (loading) {
    content.push('Loading recommended products ...');
  } else if (cartProducts.length === 0) {
    content.push('No recommended product matches found.');
  } else {
    cartProducts.forEach((product) => {
      content.push(<Product key={product._id} product={product} />);
    });
  }
  return (
    <div className="cart-products">{content}</div>
  );
};

CartProducts.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  cartProducts: React.PropTypes.array.isRequired,
};

export default CartProducts;
