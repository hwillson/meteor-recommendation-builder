import React from 'react';
import s from 'underscore.string';

const itemsLabel = (totalItems) => {
  let label = ' item';
  if (totalItems > 1) {
    label += 's';
  }
  return label;
};

const ProductTotals = ({ productTotals }) => (
  <span className="products-total">
    {productTotals.totalItems}
    {itemsLabel(productTotals.totalItems)} for
    ${s.numberFormat(productTotals.totalPrice, 2)}
  </span>
);

ProductTotals.propTypes = {
  productTotals: React.PropTypes.object,
};

export default ProductTotals;
