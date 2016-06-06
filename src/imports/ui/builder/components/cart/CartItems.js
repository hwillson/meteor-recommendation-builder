import React from 'react';

import Product from '../product/Product';

const CartItems = ({ loading, products, cartItems }) => {
  let content = [];
  if (loading) {
    content.push('Loading recommended products ...');
  } else if (cartItems.length === 0) {
    content.push('No recommended product matches found.');
  } else {
    cartItems.forEach((cartItem) => {
      let matchedProduct;
      products.forEach((product) => {
        if (product._id === cartItem.productId) {
          matchedProduct = product;
          return;
        }
      });
      content.push(
        <Product
          key={matchedProduct._id}
          product={matchedProduct}
          variationId={cartItem.variationId}
          cartItem={cartItem}
        />
      );
    });
  }
  return (
    <div className="cart-items">{content}</div>
  );
};

CartItems.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  products: React.PropTypes.array.isRequired,
  cartItems: React.PropTypes.array.isRequired,
};

export default CartItems;
